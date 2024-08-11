import { SetStateAction } from 'react';

export interface APIResponseManageModul {
  id: string;
  code: string;
  name: string;
  active: number;
}

export interface IManageModulView {
  data?: APIResponseManageModul[];
  openPopoverIndex: number;
  setOpenPopoverIndex: React.Dispatch<SetStateAction<number>>;
  handleActionButtonRow: (id: string, action: 'delete' | 'edit') => void;
}
