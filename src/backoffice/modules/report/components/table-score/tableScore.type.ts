export interface APIResponseTableScore {
  id: string;
  studentName: string;
  deadline: string;
  submitDate: string;
  status: 'On Time' | 'Late' | 'Missed';
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITableScoreView {
  data: APIResponseTableScore[];
  openPopoverIndex: number | null;
  setOpenPopoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
  Filter: string;
  setFilter: (value: string) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: (isOpen: boolean) => void;
  fetchData: () => Promise<void>;
  title: string; // Tambahkan ini
}


