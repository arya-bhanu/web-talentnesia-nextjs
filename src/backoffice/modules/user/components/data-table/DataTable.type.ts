import { ColumnDef, ColumnOrderState, SortingState } from "@tanstack/react-table";

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  sorting?: SortingState;
  initialColumnOrder?: ColumnOrderState;
  filter: {
    Filter: string;
    setFilter: (value: string) => void;
  };
}

export interface Column {
  id: string;
  header: string | React.ReactNode;
  accessorKey?: string;
  cell?: (info: any) => React.ReactNode;
}
