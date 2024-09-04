export interface APIResponseDistrict {
  id: string;
  code: string;
  name: string;
  active?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IComboDistrict {
  data: APIResponseDistrict[];
}

export interface DistrictResponse {
  data: {
    items: APIResponseDistrict[];
  };
}

export interface SingleDistrictResponse {
  data: APIResponseDistrict;
}

export interface IDistrictView {
  data: APIResponseDistrict[];
  openPopoverIndex: number | null;
  setOpenPopoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleActionButtonRow: (id: string, action: 'delete' | 'edit', rowData?: string) => void;
  handleAddDistrict: (name: string) => Promise<void>;
  Filter: string;
  setFilter: (value: string) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: (isOpen: boolean) => void;
  fetchData: () => Promise<void>;
  role: number;
}
