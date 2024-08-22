export interface APIResponseTableProgram {
  id: string;
  class: string;
  type: string;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITableProgramView {
  data: APIResponseTableProgram[];
  openPopoverIndex: number | null;
  setOpenPopoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
  Filter: string;
  setFilter: (value: string) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: (isOpen: boolean) => void;
  fetchData: () => Promise<void>;
}


