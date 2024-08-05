import cx from "classnames";
import React, { FunctionComponent } from "react";
import { GraphDataTableProps } from "./types";
import styles from "./GraphDataTable.module.scss";


export const GraphDataTable: FunctionComponent<GraphDataTableProps> = (
  props
) => {
  const { className } = props;

  return (
    <div className={cx(styles["graph-data-chart"], className)}>
      Table goes here
    </div>
  )
}
