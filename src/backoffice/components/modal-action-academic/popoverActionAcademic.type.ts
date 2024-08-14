import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface IPopOverActionAcademic {
  openPopover: boolean;
  setOpenPopover: Dispatch<SetStateAction<boolean>>;
  content: ReactNode;
  button: ReactNode;
}
