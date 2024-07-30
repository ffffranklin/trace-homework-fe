import cx from "classnames";
import React, { FunctionComponent } from "react";
import styles from "./WaterfallChart.module.scss";
import { ColumnType, Series, WaterfallChartProps, WaterfallStep } from "./types";
import { scaleLinear } from "@visx/scale";
import { AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";

export const chartService = Object.freeze({
  MIN_WIDTH: 300,
  MIN_HEIGHT: 50,
  MARGIN_TOP: 10,
  MARGIN_RIGHT: 10,
  MARGIN_BOTTOM: 10,
  MARGIN_LEFT: 10,
  LEFT_AXIS_MARGIN_TOP: 10,

  waterfallData(series: Series): WaterfallStep[] {
    const start: WaterfallStep = {
      name: 'start',
      columnLabel: series[0].label,
      columnType: series[0].type,
      columnValue: series[0].value,
    }

    const changes: WaterfallStep[] = series.slice(1).map((column, index) => ({
      name: index.toString(),
      columnLabel: column.label,
      columnType: column.type,
      columnValue: column.value,
    }))

    const end: WaterfallStep = {
      name: 'end',
      columnType: ColumnType.End,
      columnLabel: null,
      columnValue: series.map((c) => c.value).reduce((a, b) => a + b),
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
});

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
  const xScale = scaleLinear({
    domain: [data.map(step => step.columnValue).reduce((v, accu) => Math.max(v, accu)), 0],
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
        <Group>
          {data.map((step, index) => {
            const barWidth = Math.abs(xScale(step.columnValue));
            const barHeight = 20;
            const barX = 30;
            const barY = leftAxisScale(index);

            return (
              <Group>
                <Bar
                  key={`bar-${step.name}`}
                  width={barWidth}
                  height={barHeight}
                  x={barX}
                  y={barY}
                />
              </Group>
            )
          })}
        </Group>
      </svg>
    </div>
  );
};
