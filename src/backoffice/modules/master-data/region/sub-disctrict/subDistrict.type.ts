export interface APIResponseSubDistrict {
  id: string;
  code: string;
  name: string;
  description?: string;
  active: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubDistrictView {
  data: APIResponseSubDistrict[];
  openPopoverIndex: number | null;
  setOpenPopoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleActionButtonRow: (id: string, action: 'delete' | 'edit', rowData?: string) => void;
  handleAddSubDistrict: (name: string) => Promise<void>;
  Filter: string;
  setFilter: (value: string) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: (isOpen: boolean) => void;
  fetchData: () => Promise<void>;
}


