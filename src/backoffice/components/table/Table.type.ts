import { ColumnDef, ColumnOrderState, SortingState } from "@tanstack/react-table";

export interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  Sorting?: SortingState;
  initialColumnOrder?: ColumnOrderState;
  filter: {
    Filter: string;
    setFilter: (value: string) => void;
  };
}
