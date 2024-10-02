import { ColumnDef, ColumnOrderState, SortingState } from "@tanstack/react-table";

export interface DataTableAccordionProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  sorting?: SortingState;
  initialColumnOrder?: ColumnOrderState;
  filter: {
    Filter: string;
    setFilter: (value: string) => void;
  };
  accordionProps: {
    id: string;
    question: string;
    answer: string;
  };
  handleDelete: (id: string) => void;
}