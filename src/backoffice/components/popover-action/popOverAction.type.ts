import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface IPopOverAction {
  openPopover: boolean;
  setOpenPopover: Dispatch<SetStateAction<boolean>>;
  content: ReactNode;
  button: ReactNode;
}
