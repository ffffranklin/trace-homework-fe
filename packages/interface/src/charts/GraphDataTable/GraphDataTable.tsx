import cx from "classnames";
import React, { FunctionComponent } from "react";
import { GraphDataTableProps } from "./types";
import styles from "./GraphDataTable.module.scss";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { TableDataRow } from "@exp/tree";


export const GraphDataTable: FunctionComponent<GraphDataTableProps> = (
  props
) => {
  const { className, data } = props;

  const columnHelper = createColumnHelper<TableDataRow>()

  const columns = data.schema.columns.map((column) =>
    columnHelper.accessor(column.field as any, {
      cell: info => {
        const val = info.getValue();

        if (Array.isArray(val)) {
          return val[0] - val[1];
        } else {
          return val
        }
      },
      header: (info)=> <span>{column.label}</span>
    })
  )

  const table = useReactTable<TableDataRow>({
    data: data.data,
    columns,
    getCoreRowModel: getCoreRowModel<TableDataRow>()
  })

  return (
    <div className={cx(styles["graph-data-chart"], className)}>
      <table>
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
        <tfoot>
        {table.getFooterGroups().map(footerGroup => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                  )}
              </th>
            ))}
          </tr>
        ))}
        </tfoot>
      </table>
    </div>
  )
}
