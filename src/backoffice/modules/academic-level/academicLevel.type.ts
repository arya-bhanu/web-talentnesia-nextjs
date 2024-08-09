import { SetStateAction } from 'react';

export interface APIResponseAcademicLevel {
  id: number;
  levelName: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAcademicLevelView {
  data?: APIResponseAcademicLevel[];
  openPopoverIndex: number;
  setOpenPopoverIndex: React.Dispatch<SetStateAction<number>>;
  handleActionButtonRow: (id: number, action: 'delete' | 'edit') => void;
}
