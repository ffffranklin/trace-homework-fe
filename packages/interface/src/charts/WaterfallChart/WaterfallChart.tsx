import cx from "classnames";
import React, { FunctionComponent } from "react";
import styles from "./WaterfallChart.module.scss";
import {Series, WaterfallChartProps} from "./types";


export const chartService = {
  getMinMax(columns: Series): [number, number]{
    const numericVals = columns.map((column)=> column.value);
    return [Math.min(...numericVals), Math.max(...numericVals)];
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
