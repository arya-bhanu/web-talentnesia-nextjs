import { SetStateAction } from 'react';

export interface APIResponseAcademicLevel {
  code: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAcademicLevelView {
  data?: APIResponseAcademicLevel[];
  openPopoverIndex: number;
  setOpenPopoverIndex: React.Dispatch<SetStateAction<number>>;
  handleActionButtonRow: (id: number, action: 'delete' | 'edit') => void;
}
