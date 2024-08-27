// Parent Interface
export interface APIResponseListStudent {
  id: string;
  photo?: string;
  name: string;
  email: string;
  noHp: string;
  active?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Child Interface
export interface DetailStudentProps extends APIResponseListStudent {
  nik: string;
  school: string;
  ktpPhoto?: string;
  placeOfBirth: string;
  dateOfBirth: string;
  religion: string;
  gender: string;
  province: string;
  city: string;
  subDistrict: string;
  zipCode: string;
  addressKTP: string;
  addressDomicile: string;
  institutionName: string;
  academicLevel: string;
  startFrom: string;
  endDate: string;
}


export interface IListStudentView {
  data: APIResponseListStudent[];
  openPopoverIndex: number | null;
  setOpenPopoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleActionButtonRow: (id: string, action: 'delete' | 'edit', rowData?: string) => void;
  handleAddListStudent: (name: string) => Promise<void>;
  Filter: string;
  setFilter: (value: string) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: (isOpen: boolean) => void;
  isPopoverOpen: boolean;
  setIsPopoverOpen: (isOpen: boolean) => void;
  fetchData: () => Promise<void>;
}
