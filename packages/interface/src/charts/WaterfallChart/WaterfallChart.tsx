import cx from "classnames";
import React, { FunctionComponent } from "react";
import styles from "./WaterfallChart.module.scss";
import { ColumnType, Series, WaterfallChartProps, WaterfallStep } from "./types";
import { scaleOrdinal } from "@visx/scale";

export const chartService = Object.freeze({
  MIN_WIDTH: 300,
  MIN_HEIGHT: 50,
  MARGIN_TOP: 10,
  MARGIN_RIGHT: 10,
  MARGIN_BOTTOM: 10,
  MARGIN_LEFT: 10,

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

  getOrdinalScale(columns: Series): any {
    return scaleOrdinal({
      domain: columns.map((c, index) => c.value),
      range: columns.map((c, index) => index),
    })
  }
});

export const WaterfallChart: FunctionComponent<WaterfallChartProps> = (
  props
) => {
  const { className } = props;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const chartHeight = chartService.getChartHeight(height);
  const chartWidth = chartService.getChartWidth(width)

  return (
    <div className={cx(styles["waterfall-chart"], className)}>
      <svg height={chartHeight} width={chartWidth}>

      </svg>
    </div>
  );
};
