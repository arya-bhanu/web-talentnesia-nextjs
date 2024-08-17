export interface APIResponseReligion {
  id: string;
  code: string;
  name: string;
  description?: string;
  active: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReligionView {
  data: APIResponseReligion[];
  openPopoverIndex: number | null;
  setOpenPopoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleActionButtonRow: (id: string, action: 'delete' | 'edit', rowData?: string) => void;
  handleAddReligion: (name: string) => Promise<void>;
  Filter: string;
  setFilter: (value: string) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: (isOpen: boolean) => void;
  fetchData: () => Promise<void>;
}


