import { EdgeType, TableData, TableDataColumn, TableDataRow, Tree, TreeNode } from "./types";
import { bfsFromNode } from "graphology-traversal";

/**
 * Transforms a given tree structure into a table format suitable for
 * rendering. It specifically targets nodes segmented by certain criteria
 * and displays their values at two distinct dates.
 *
 * The function accepts a `Tree` object, representing a graph of nodes
 * connected by various types of edges. The output is a table structure
 * (represented by `TableData`) designed for tabular
 * data display.
 *
 * The generated table focuses on nodes with at least one incoming
 * segmentation edge. For each of these nodes, the table includes columns
 * for:
 * - The values at two specific dates, for temporal comparison.
 * - The segment definition, providing data context.
 * - Values of nodes connected by an arithmetic edge, showing operational
 *   relationships.
 *
 * @param tree The `Tree` object with the data to transform into a table.
 * @param date1 The base date to filter timeseries data
 * @param date2 The comparison date to filter timeseries data
 * @returns A `TableData` table structure detailing segmented
 *          nodes, their data at two dates, segmentation definitions, and
 *          arithmetic connections.
 */
export function treeTable(
  tree: Tree,
  date1?: Date,
  date2?: Date,
): TableData {

  if (!tree) throw "implement me";

  const nodeFields = ['total_orders_calc', 'cart_conversion', 'total_carts'];
  const columnsMap = new Map<string, TableDataColumn>()
  const segments: { [k: string]: any[] } = {};

  columnsMap.set('segment', {
    field: 'segment', label: '', format: 'string'
  })

  const data: TableDataRow[] = []

  function updateSegment(name: string | number, attrs: TreeNode) {
    segments[name] = [...(segments[name] || []), attrs]
  }

  function updateColumns(field: string, { format, label }: TreeNode) {
    columnsMap.set(field, { format, label, field })
  }

  function groupNodesBySegment(node: string, attributes: TreeNode, override?: string | number | null) {
    const segmentName = attributes.segment[0]?.value || 'Overall'

    if (nodeFields.some(field => node.startsWith(field))) {
      updateColumns(node, attributes);
      updateSegment(segmentName, attributes);
    }

    tree.edges(node).map((edge) => {
      const attrs = tree.getEdgeAttributes(edge);
      const target = tree.target(edge);
      const targetAttrs = tree.getNodeAttributes(target);
      const targetSegment = targetAttrs.segment[0]?.value;

      if (attrs.type === EdgeType.Segmentation) {
        if (nodeFields.some(nf => target.startsWith(nf)) && target !== node) {
          groupNodesBySegment(target, targetAttrs, targetSegment);
        }
      }

      if (attrs.type === EdgeType.Arithmetic) {
        if (nodeFields.some(nf => target.startsWith(nf))) {
          updateColumns(target, targetAttrs);
          updateSegment(segmentName, targetAttrs)
        }
      }
    })
  }

  bfsFromNode(tree, nodeFields[0], (node, attributes, depth) => {
    groupNodesBySegment(node, attributes)
    return depth === 0;
  })

  Object.entries(segments).map(([segment, nodes]: [string, TreeNode[]]) => {
    for (let i = 0; i < nodes[0].data.length; i++) {
      if ([date1?.toDateString(), date2?.toDateString()].includes(nodes[0].data[i].date.toDateString())) {
        data.push({
          segment,
          date: nodes[0].data[i].date,
          cart_conversion: nodes[2].data[i].value,
          total_carts: nodes[1].data[i].value,
          total_orders_calc: nodes[0].data[i].value,
        })
      }
    }
  })

  const columns: TableDataColumn[] = ['segment', 'total_orders_calc', 'cart_conversion', 'total_carts']
    .filter((field) => columnsMap.has(field))
    .map((field) => columnsMap.get(field) as TableDataColumn)

  return {
    schema: {
      name: 'ecommerce_performance',
      columns,
    },
    filters: {
      date1,
      date2,
    },
    data
  }
}
