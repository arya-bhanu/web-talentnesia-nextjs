export interface APIResponseProvince {
  id: string;
  code: string;
  name: string;
  description?: string;
  active: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProvinceView {
  data: APIResponseProvince[];
  openPopoverIndex: number | null;
  setOpenPopoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleActionButtonRow: (id: string, action: 'delete' | 'edit', rowData?: string) => void;
  handleAddProvince: (name: string) => Promise<void>;
  Filter: string;
  setFilter: (value: string) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: (isOpen: boolean) => void;
  fetchData: () => Promise<void>;
}


