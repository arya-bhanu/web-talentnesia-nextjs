import { SetStateAction } from 'react';

export interface APIResponseAcademicLevel {
  id: string;
  code: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// academicLevel.type.ts
export interface IAcademicLevelView {
  data?: APIResponseAcademicLevel[];
  initialData?: any[];
  openPopoverIndex: number | null;
  setOpenPopoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleActionButtonRow: (id: string, action: 'delete' | 'edit') => void;
  handleAddAcademicLevel: (code: string, name: string) => Promise<void>; // Tambahkan ini
}

