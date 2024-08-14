export interface APIResponseAcademicLevel {
  id: string;
  code: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAcademicLevelView {
  data: APIResponseAcademicLevel[];
  openPopoverIndex: number | null;
  setOpenPopoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleActionButtonRow: (id: string, action: 'delete' | 'edit') => void;
  handleAddAcademicLevel: (code: string, name: string) => Promise<void>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: (isOpen: boolean) => void;
  fetchData: () => Promise<void>;
}


