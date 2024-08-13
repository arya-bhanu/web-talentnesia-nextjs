import { ColumnDef, ColumnOrderState, SortingState } from "@tanstack/react-table";

export interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  initialSorting?: SortingState;
  initialColumnOrder?: ColumnOrderState;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}
