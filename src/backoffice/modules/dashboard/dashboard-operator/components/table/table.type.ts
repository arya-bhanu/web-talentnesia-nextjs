import { DashboardProgressItem } from '../../dashboardOperator.type';

export interface APIResponseManageModul {
    id: string;
    class: string;
    type: string;
    progress: number; 
  }
  
  export interface ITableViewProps {
    data: DashboardProgressItem[];
    selectedType: string;
    onTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    currentPage: number;
    totalPages: number;
    onPageChange: (direction: 'prev' | 'next') => void;
    onItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    itemsPerPage: number;
  }
  