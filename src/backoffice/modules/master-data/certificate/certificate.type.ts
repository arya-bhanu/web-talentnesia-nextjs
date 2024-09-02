export interface APIResponseCertificate {
  id: string;
  code: string;
  name: string;
  description?: string;
  active: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICertificateView {
  data: APIResponseCertificate[];
  openPopoverIndex: number | null;
  setOpenPopoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleActionButtonRow: (id: string, action: 'delete' | 'edit', rowData?: string) => void;
  handleAddCertificate: (name: string, file: string) => Promise<void>;
  Filter: string;
  setFilter: (value: string) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: (isOpen: boolean) => void;
  fetchData: () => Promise<void>;
}


