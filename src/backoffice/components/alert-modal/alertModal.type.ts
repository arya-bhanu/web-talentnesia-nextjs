import { SetStateAction } from 'react';

export interface IAlertModal {
  openModal: boolean;
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
  setIsConfirmed: React.Dispatch<SetStateAction<boolean>>;
}
