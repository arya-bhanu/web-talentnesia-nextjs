export interface FilterOption {
    label: string;
    value: string;
    count?: number;
  }
  
  export interface FilterCategory {
    title: string;
    options: FilterOption[];
  }
  