export interface APIResponseAcademicLevel {
  id: string;
  code: string;
  name: string;
  active?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAcademicLevelView {
  data: APIResponseAcademicLevel[];
  openPopoverIndex: number | null;
  setOpenPopoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleActionButtonRow: (id: string, action: 'delete' | 'edit', rowData?: string) => void;
  handleAddAcademicLevel: (name: string) => Promise<void>;
  Filter: string;
  setFilter: (value: string) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: (isOpen: boolean) => void;
  fetchData: () => Promise<void>;
}


