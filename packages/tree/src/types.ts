import { MultiDirectedGraph } from "graphology";

/**
 * Represents the unique identifier for nodes within the graph.
 */
export type NodeId = string;

/**
 * Represents the unique identifier for edges within the graph.
 */
export type EdgeId = string;

/**
 * Describes a series of data points over time, each with a date and a potentially null value.
 */
export type Timeseries = {
  date: Date;
  value: number | null;
}[];

/**
 * Defines a segment associated with nodes in the graph, representing
 * categorization or grouping criteria. Each segment consists of an array
 * of objects, where each object represents a segment criterion with a
 * name and a value.
 *
 * The `name` field identifies the segment (e.g., "Region", "ProductType"),
 * allowing for descriptive categorization of nodes. The `value` field
 * specifies the segment's value, which can be a string, a number, or null,
 * accommodating a wide range of categorization needs.
 *
 * This type is utilized in both MetricNode and OperatorNode types to
 * apply segmentation to nodes, enabling the graph to reflect complex
 * data structures with varied categorizations and groupings.
 *
 * @example
 * // Segmenting nodes by region
 * const segment: Segment = [
 *   { name: "Region", value: "North America" }
 * ];
 */
export type Segment = {
  name: string;
  value: string | number | null;
}[];

/**
 * Enumerates the formats that a node's value can take, such as currency, integer, or decimal.
 */
export enum ValueFormat {
  Currency = "currency",
  Integer = "integer",
  Decimal = "decimal",
}

/**
 * Enumerates the types of nodes within the graph: Metric or Operator.
 */
export enum NodeType {
  Metric = "metric",
  Operator = "operator",
}

/**
 * Defines the structure of a Metric node, which contains time-series data and formatting information.
 */
export type MetricNode<T> = {
  type: NodeType.Metric;
  label: string;
  shortLabel?: string;
  format: ValueFormat;
  segment: Segment;
  data: T;
};

/**
 * Defines the structure of an Operator node, which contains time-series data and formatting information.
 */
export type OperatorNode<T> = {
  type: NodeType.Operator;
  label: string;
  shortLabel?: string;
  format: ValueFormat;
  segment: Segment;
  data: T;
};

/**
 * Enumerates the types of edges within the graph: Arithmetic or Segmentation.
 */
export enum EdgeType {
  Arithmetic = "arithmetic",
  Segmentation = "segmentation",
}

/**
 * Describes an Arithmetic edge, indicating an arithmetic relationship between nodes.
 */
export type ArithmeticEdge = {
  type: EdgeType.Arithmetic;
};

/**
 * Describes a Segmentation edge, indicating a segmentation relationship between nodes.
 */
export type SegmentationEdge = {
  type: EdgeType.Segmentation;
};

/**
 * Union type for edge definitions, can be either ArithmeticEdge or SegmentationEdge.
 */
export type TreeEdge = ArithmeticEdge | SegmentationEdge;

/**
 * Union type for node definitions, can be either MetricNode or OperatorNode, both holding time-series data.
 */
export type TreeNode = MetricNode<Timeseries> | OperatorNode<Timeseries>;

/**
 * Represents additional information associated with the graph, allowing for any key-value pairs.
 */
export type TreeInfo = {
  [key: string]: unknown;
};

/**
 * Defines the type for the specialized graph structure, using nodes, edges, and additional information.
 */
export type Tree = MultiDirectedGraph<TreeNode, TreeEdge, TreeInfo>;

/**
 * TODO: IMPLEMENT THIS
 */
export type YourTableTypeOrInterfaceOrFunctionEtc = never;
