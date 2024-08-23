import { ReactNode } from 'react';

export interface IPopover {
  index: number;
  openPopoverIndex: number;
  handleActionButtonRow: (id: string, action: 'delete' | 'edit') => void;
  id: string;
  setOpenPopoverIndex: (id: number) => void;
  content?: ReactNode;
}
