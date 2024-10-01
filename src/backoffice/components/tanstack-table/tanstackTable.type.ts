import { ColumnDef } from '@tanstack/react-table';

export interface ITanstackTable<T> {
  apiUrl: string;
  columns: ColumnDef<T>[];
  pageSizeOptions?: number[];
  children?: React.ReactNode;
  onRefresh?: () => void;
}

export interface ITanstackTableViewProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  currentPage: number;
  totalPages: number;
  totalData: number;
  pageSize: number;
  pageSizeOptions: number[];
  searchTerm: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  setSearchTerm: (value: string) => void;
  setPageSize: (value: number) => void;
  handleSort: (field: string) => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  children?: React.ReactNode;
  onRefresh?: () => void;
}
