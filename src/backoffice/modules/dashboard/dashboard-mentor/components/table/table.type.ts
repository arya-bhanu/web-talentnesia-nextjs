export interface APIResponseManageModul {
    id: string;
    class: string;
    type: string;
    progress: number; 
  }
  
  export interface ITableViewProps {
    data?: APIResponseManageModul[];
    openPopoverIndex: number;
    setOpenPopoverIndex: React.Dispatch<React.SetStateAction<number>>;
    selectedType: string;
    onTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  }
  