import { SetStateAction } from 'react';

export interface IAlertEditModal {
  openModal: boolean;
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
  setIsConfirmed: React.Dispatch<SetStateAction<boolean>>;
}
