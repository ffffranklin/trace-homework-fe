import cx from "classnames";
import React, { FunctionComponent } from "react";
import styles from "./WaterfallChart.module.scss";
import { ColumnType, Series, WaterfallChartProps, WaterfallStep } from "./types";
import { scaleLinear } from "@visx/scale";
import { AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { Bar, Line } from "@visx/shape";

export const theme = {
  light: {
    colors: {
      lines: "#000"
    }
  },
  dark: {
    colors: {
      lines: "#ddd"
    }
  }
}
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
  PADDING_RIGHT: 5,

  waterfallData(series: Series): WaterfallStep[] {
    const start: WaterfallStep = {
      name: 'start',
      subtotal: series[0].value,
      value: series[0].value,
      columnLabel: series[0].label,
      columnType: series[0].type,
      columnValue: series[0].value,
    }

    const changes: WaterfallStep[] = series.slice(1).map((column, index) => ({
      name: index.toString(),
      subtotal: series.slice(0, index + 2).map(c => c.value).reduce((a, b) => a + b),
      value: column.value,
      columnLabel: column.label,
      columnType: column.type,
      columnValue: column.value,
    }))

    const end: WaterfallStep = {
      name: 'end',
      subtotal: series.map((c) => c.value).reduce((a, b) => a + b),
      value: series.map((c) => c.value).reduce((a, b) => a + b),
      columnType: ColumnType.End,
      columnLabel: null,
      columnValue: null,
    }

    return [start, ...changes, end];
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
    return index === 0 && 'start' || index === ticks[ticks.length - 1].index && 'end' || `${value}`
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
};

export const WaterfallChart: FunctionComponent<WaterfallChartProps> = (
  props
) => {
  const { className, series } = props;

  const data = chartService.waterfallData(series);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const chartHeight = chartService.getChartHeight(height);
  const chartWidth = chartService.getChartWidth(width)
  const leftAxisScale = chartService.getLeftScale(data, chartHeight);
  const barGroupOffsetY = chartService.LEFT_AXIS_MARGIN_TOP + leftAxisScale(0.30);
  const barGroupOffsetX = chartService.BAR_GROUP_LEFT_MARGIN;
  const xScale = scaleLinear({
    domain: [data.map(step => step.value).reduce((v, accu) => Math.max(v, accu)), 0],
    range: [chartWidth, 0]
  });

  return (
    <div className={cx(styles["waterfall-chart"], className)}>
      <svg height={chartHeight} width={chartWidth}>
        <AxisLeft
          scale={leftAxisScale}
          left={40}
          top={chartService.LEFT_AXIS_MARGIN_TOP}
          tickFormat={chartService.leftScaleTickFormat}
          tickValues={chartService.leftScaleTickValues(data)}
        />
        <Group top={barGroupOffsetY} left={barGroupOffsetX}>
          {data.map((step, index) => {
            const barWidth = Math.abs(xScale(step.value));
            const barHeight = chartService.BAR_HEIGHT;
            const barX = xScale(chartService.xBarOffset(data[index - 1], step, index));
            const barY = leftAxisScale(index);
            const lineLength = barHeight;
            const lineY0 = barY + barHeight;
            const lineY1 = lineY0 + lineLength;
            const lineX = barX;

            return (
              <Group key={`step-${step.name}`}>
                <Bar
                  width={barWidth}
                  height={barHeight}
                  x={barX}
                  y={barY}
                />
                <Line
                  from={{ x: lineX, y: lineY0 }}
                  to={{ x: lineX, y: lineY1 }}
                  stroke="black"
                />
              </Group>
            )
          })}
        </Group>
      </svg>
    </div>
  );
};
