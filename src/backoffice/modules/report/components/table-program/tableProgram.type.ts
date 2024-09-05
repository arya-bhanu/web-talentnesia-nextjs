export interface APIResponseTableProgram {
  id: string;
  code: string;
  name: string;
  type: string;
  active: number;
  progress: string;
}

export interface ITableProgramView {
  data?: APIResponseTableProgram[] | null;
  openPopoverIndex: number | null;
  setOpenPopoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
  Filter: string;
  setFilter: (value: string) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: (isOpen: boolean) => void;
}
