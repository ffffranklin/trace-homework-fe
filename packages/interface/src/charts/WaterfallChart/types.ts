/**
 * Enum representing the types of columns in the waterfall chart.
 */
export enum ColumnType {
  /** Start column indicating the initial value in the data series. */
  Start = "start",
  /** Change column representing an incremental change in the data series. */
  Change = "change",
  /** End column denoting the final value in the data series. */
  End = "end",
}

/**
 * Enum for specifying the format of the values displayed in the chart.
 */
export enum Format {
  /** Format the values as currency. */
  Currency = "currency",
  /** Format the values as a number with fixed decimal precision. */
  Number = "number",
}

/**
 * Represents a start column in the waterfall chart.
 * Holds the initial value of the series and includes a label for the y-axis.
 */
export type StartColumn = {
  type: ColumnType.Start;
  /** The label for the column, displayed on the y-axis. */
  label: string;
  /** The numeric value of the column, to be formatted based on the specified format. */
  value: number;
};

/**
 * Represents a change column in the waterfall chart.
 * Reflects a change or increment in the data series and includes a label for the y-axis.
 */
export type ChangeColumn = {
  type: ColumnType.Change;
  /** The label for the column, displayed on the y-axis. */
  label: string;
  /** The numeric value indicating the change, to be formatted based on the specified format. */
  value: number;
};

/**
 * Custom type representing the provided series of columns for the waterfall chart.
 * It starts with a StartColumn, followed by one or more ChangeColumns.
 * Each column includes a label for the y-axis, reflecting its identity or description.
 */
type Series = [StartColumn, ...ChangeColumn[]];

/**
 * Prop types for the Waterfall Chart component.
 */
export type WaterfallChartProps = {
  /** Optional CSS class name for additional styling. */
  className?: string;
  /** Format for displaying the values (either as Currency or Number). */
  format: Format;
  /** The series of columns to be rendered in the chart, each with a label for the y-axis. */
  series: Series;
};
