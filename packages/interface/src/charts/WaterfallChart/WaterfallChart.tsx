import cx from "classnames";
import React, { FunctionComponent } from "react";
import styles from "./WaterfallChart.module.scss";
import {Series, WaterfallChartProps} from "./types";
import {scaleLinear, scaleOrdinal} from "@visx/scale";


export const chartService = {
  getMinMax(columns: Series): [number, number]{
    const numericVals = columns.map((column)=> column.value);
    return [Math.min(...numericVals), Math.max(...numericVals)];
  },

  getScale([min, max]: [number, number]): any {
    return  scaleLinear({domain: [min, max]})
  },

  getOrdinalScale(columns: Series): any {
    return scaleOrdinal({
      domain: columns.map((c, index)=> c.value),
      range: columns.map((c, index)=> index),
    })
  }
}

export const WaterfallChart: FunctionComponent<WaterfallChartProps> = (
  props
) => {
  const { className } = props;
  return (
    <div className={cx(styles["waterfall-chart"], className)}>
      Your waterfall chart
    </div>
  );
};
