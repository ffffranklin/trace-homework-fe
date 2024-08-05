export enum ValueFormat {
  Currency = "currency",
  Integer = "integer",
  Decimal = "decimal",
  Percent = "percent",
}

export interface TableDataColumn {
  field: string;
  label: string;
  format: ValueFormat | 'string';
}

export interface TableDataRow {
  segment: string,
  date: Date,
  conversion: number | null,
  total_carts: number | null,
  total_orders_calc: number | null,
}

/**
 * TODO: IMPLEMENT THIS
 */
export type TableData = {
  schema: {
    name: string,
    columns: TableDataColumn[]
  },
  filters: {
    date1: Date | undefined,
    date2: Date | undefined,
  }
  data: TableDataRow[]
};
