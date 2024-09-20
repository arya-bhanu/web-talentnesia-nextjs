export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}
