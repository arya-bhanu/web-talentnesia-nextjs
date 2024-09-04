export interface APIResponsePartner {
  id: string;
  code: string;
  name: string;
  address: string;
  logo: string;
  description?: string;
  active: number;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date,
  deletedAt?: Date
}

export interface IPartnerView {
  data: APIResponsePartner[];
  openPopoverIndex: number | null;
  setOpenPopoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleActionButtonRow: (id: string, action: 'delete' | 'edit', rowData?: string) => void;
  handleAddPartners: (name: string, address: string, logo: string, description: string) => Promise<void>;
  Filter: string;
  setFilter: (value: string) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: (isOpen: boolean) => void;
  fetchData: () => Promise<void>;
}


