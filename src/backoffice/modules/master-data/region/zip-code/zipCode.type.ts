export interface APIResponseZipCode {
  id: string;
  code: string;
  name: string;
  description?: string;
  active: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IZipCodeView {
  data: APIResponseZipCode[];
  openPopoverIndex: number | null;
  setOpenPopoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleActionButtonRow: (id: string, action: 'delete' | 'edit', rowData?: string) => void;
  handleAddZipCode: (name: string) => Promise<void>;
  Filter: string;
  setFilter: (value: string) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: (isOpen: boolean) => void;
  fetchData: () => Promise<void>;
}


