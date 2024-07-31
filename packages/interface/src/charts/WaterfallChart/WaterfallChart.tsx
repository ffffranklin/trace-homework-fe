import cx from "classnames";
import React, { FunctionComponent, useState } from "react";
import styles from "./WaterfallChart.module.scss";
import { ColumnType, Format, Series, Theme, WaterfallChartProps, WaterfallStep } from "./types";
import { scaleLinear } from "@visx/scale";
import { AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { Bar, Line } from "@visx/shape";

export const theme = {
  [Theme.Light]: {
    colors: {
      text: '#626b76',
      lines: '#626b76',
      bar: ['#db3f6d', '#9fa9b7', '#74d28a'], // [red, grey, green]
      barLabel: '#000'
    }
  },
  [Theme.Dark]: {
    colors: {
      text: '#737780',
      lines: '#737780',
      bar: ['#5e1a2e', '#5a616a', '#26482e'], // [red, grey, green]
      barLabel: '#d0d2d5'
    }
  }
};

export const chartService = {
  BAR_GROUP_LEFT_MARGIN: 50,
  BAR_HEIGHT: 23,
  LEFT_AXIS_MARGIN_TOP: 10,
  MARGIN_BOTTOM: 10,
  MARGIN_LEFT: 10,
  MARGIN_RIGHT: 10,
  MARGIN_TOP: 10,
  MIN_HEIGHT: 50,
  MIN_WIDTH: 300,
  PADDING_RIGHT: (typeof window === "undefined") ? 0 : window.outerWidth * .025,

  waterfallData(series: Series, formatter?: (n: number) => string): WaterfallStep[] {
    const val = (v: number): string => formatter ? formatter(v) : v.toString()
    const start: WaterfallStep = {
      name: 'start',
      subtotal: series[0].value,
      value: series[0].value,
      formattedValue: val(series[0].value),
      columnLabel: series[0].label,
      columnType: series[0].type,
      columnValue: series[0].value,
    }

    const changes: WaterfallStep[] = series.slice(1).map((column, index) => ({
      name: index.toString(),
      subtotal: series.slice(0, index + 2).map(c => c.value).reduce((a, b) => a + b),
      value: column.value,
      formattedValue: val(column.value),
      columnLabel: column.label,
      columnType: column.type,
      columnValue: column.value,
    }))

    const end: WaterfallStep = {
      name: 'end',
      subtotal: series.map((c) => c.value).reduce((a, b) => a + b),
      value: series.map((c) => c.value).reduce((a, b) => a + b),
      formattedValue: val(series.map((c) => c.value).reduce((a, b) => a + b)),
      columnType: ColumnType.End,
      columnLabel: null,
      columnValue: null,
    }

    return [start, ...changes, end];
  },

  omitColumns(series: Series, omittedColumns: string[]): Series {
    return series.filter(col => !omittedColumns.some(label => label === col.label)) as Series
  },

  getChartHeight(outerHeight: number): number {
    return outerHeight - this.MARGIN_TOP - this.MARGIN_BOTTOM
  },

  getChartWidth(outerWidth: number): number {
    return Math.max(this.MIN_WIDTH, outerWidth - this.MARGIN_LEFT - this.MARGIN_RIGHT)
  },

  getLeftScale(data: WaterfallStep[], height: number): any {
    return scaleLinear({
      domain: [data.length, 0],
      range: [height, 0],
    })
  },

  leftScaleTickFormat(value: unknown, index: number, ticks: any[]) {
    return index === 0 && 'start' || index === ticks[ticks.length - 1].index && 'end' || `${Math.floor(Number(value) - 1)}`
  },

  leftScaleTickValues(data: WaterfallStep[]) {
    return data.map((v, index) => index + 0.5)
  },

  xBarOffset(prevStep: WaterfallStep, step: WaterfallStep, index: number) {
    if (step.columnType === ColumnType.Start || step.columnType === ColumnType.End) return 0;

    if (step.value >= 0) {
      return prevStep.subtotal;
    } else {
      return step.subtotal;
    }
  },

  barColor(step: WaterfallStep, [red, grey, green]: string[]) {
    if (step.columnType === ColumnType.Start || step.columnType === ColumnType.End) {
      return grey;
    }

    if (step.columnValue as number > 0) {
      return green;
    } else {
      return red;
    }
  }
};

export const WaterfallChart: FunctionComponent<WaterfallChartProps> = (
  props
) => {
  // props
  const { className, series, theme: themeMode, format } = props;
  // state
  const [omittedColumns, updateOmittedColums] = useState<string[]>([])
  // vars
  const currTheme = theme[themeMode];
  const seriesWithOmittedColumns = chartService.omitColumns(series, omittedColumns);
  const formatter: {[key: string]: (n: number)=> string} = {
    [Format.Number]: (n: number)=> Number(n).toFixed(2),
    [Format.Currency]: Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format
  }
  const data = chartService.waterfallData(seriesWithOmittedColumns, formatter[format])
  const width = window.innerWidth;
  const height = window.innerHeight;
  const chartHeight = chartService.getChartHeight(height);
  const chartWidth = chartService.getChartWidth(width)
  const leftAxisScale = chartService.getLeftScale(data, chartHeight);
  const barGroupOffsetY = chartService.LEFT_AXIS_MARGIN_TOP + leftAxisScale(0.30);
  const barGroupOffsetX = chartService.BAR_GROUP_LEFT_MARGIN;
  const xScale = scaleLinear({
    domain: [data.map(step => step.value).reduce((v, accu) => Math.max(v, accu)) + chartService.PADDING_RIGHT, 0],
    range: [chartWidth, 0]
  });

  return (
    <div className={cx(styles["waterfall-chart"], className, styles[props.theme])}>
      <svg height={chartHeight} width={chartWidth}>
        <AxisLeft
          scale={leftAxisScale}
          left={40}
          top={chartService.LEFT_AXIS_MARGIN_TOP}
          tickFormat={chartService.leftScaleTickFormat}
          tickValues={chartService.leftScaleTickValues(data)}
          tickStroke={currTheme.colors.lines}
          tickLabelProps={({ fill: currTheme.colors.text })}
          stroke={currTheme.colors.lines}
        />
        <Group top={barGroupOffsetY} left={barGroupOffsetX}>
          {data.map((step, index) => {
            const barColor = chartService.barColor(step, currTheme.colors.bar)
            const barWidth = Math.abs(xScale(step.value));
            const barHeight = chartService.BAR_HEIGHT;
            const barX = xScale(chartService.xBarOffset(data[index - 1], step, index));
            const barY = leftAxisScale(index);
            const lineLength = barHeight;
            const lineY0 = barY + barHeight;
            const lineY1 = lineY0 + lineLength;
            const lineX = barX + (step.value < 0 ? 0 : barWidth);

            return (
              <Group key={`step-${step.name}`}>
                <Bar
                  width={barWidth}
                  height={barHeight}
                  x={barX}
                  y={barY}
                  fill={barColor}
                  onClick={() => {
                    if (step.columnType === ColumnType.Change && step.columnLabel) {
                      updateOmittedColums([...omittedColumns, step.columnLabel])
                    }
                  }}
                />
                <Line
                  from={{ x: lineX, y: lineY0 }}
                  to={{ x: lineX, y: lineY1 }}
                  stroke={currTheme.colors.lines}
                />
                <text
                  x={barX + barWidth}
                  y={barY}
                  fill={currTheme.colors.barLabel}
                  fontSize={12}
                  dx={"-0.5em"}
                  dy={"1.3em"}
                  className={cx(styles["bar-text"])}
                >
                  {step.formattedValue}
                </text>
              </Group>
            )
          })}
        </Group>
      </svg>
    </div>
  );
};
