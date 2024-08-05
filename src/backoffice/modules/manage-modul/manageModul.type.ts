import { MutableRefObject, SetStateAction } from 'react';

export interface APIResponseManageModul {
  id: number;
  chapter?: any | null;
  modulName: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IManageModulView {
  data?: APIResponseManageModul[];
  activeActionPopup: number;
  setActivePopup: React.Dispatch<SetStateAction<number>>;
  handleActionButtonRow: (id: number, action: 'delete' | 'edit') => void;
}
