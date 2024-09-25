import { ColumnDef, ColumnOrderState, SortingState } from "@tanstack/react-table";
import { Row } from '@tanstack/react-table';

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



export interface Column<T> {
  id: string;
  header: string | React.ReactNode;
  accessorKey?: keyof T;
  cell?: (info: { row: Row<T> }) => React.ReactNode;
}

