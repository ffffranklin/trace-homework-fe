import cx from "classnames";
import React, { FunctionComponent } from "react";
import styles from "./WaterfallChart.module.scss";
import { WaterfallChartProps } from "./types";

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
