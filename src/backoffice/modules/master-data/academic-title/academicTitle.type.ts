export interface APIResponseAcademicTitle {
  id: string;
  code: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAcademicTitleView {
  data: APIResponseAcademicTitle[];
  openPopoverIndex: number | null;
  setOpenPopoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleActionButtonRow: (id: string, action: 'delete' | 'edit', rowData?: string) => void;
  handleAddAcademicTitle: (name: string) => Promise<void>;
  Filter: string;
  setFilter: (value: string) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: (isOpen: boolean) => void;
  fetchData: () => Promise<void>;
}


