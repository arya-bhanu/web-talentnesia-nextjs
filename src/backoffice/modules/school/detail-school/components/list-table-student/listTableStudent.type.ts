export interface APIResponseListTableStudent {
  id: string;
  imageUrl: string;
  name: string;
  pic: string;
  email: string;
  phone: string;
  address: string;
  }
  
  export interface IListTableStudentView {
    data: APIResponseListTableStudent[];
    openPopoverIndex: number | null;
    setOpenPopoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
    Filter: string;
    setFilter: (value: string) => void;
    isPopupOpen: boolean;
    setIsPopupOpen: (isOpen: boolean) => void;
    fetchData: () => Promise<void>;
  }
  
  
  