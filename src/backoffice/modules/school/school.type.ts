export interface APIResponseSchool {
  id: string;
  name: string;
  pic: string;
  email: string;
  phone: string;
  address: string;
  imageUrl: string;
  active: number;
  createdBy: string;
  provinceId: string | null;
  districtId: string | null;
  levelId: string | null;
}


export interface ISchoolView {
  data: APIResponseSchool[];
  openPopoverIndex: number | null;
  setOpenPopoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleActionButtonRow: (
    id: string,
    action: 'delete' | 'edit',
    rowData?: string,
  ) => void;
  handleAddSchool: (name: string) => Promise<void>;
  Filter: string;
  setFilter: (value: string) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: (isOpen: boolean) => void;
  fetchData: () => Promise<void>;
}
