import { SetStateAction } from 'react';

export interface IAlertAddModal {
  openModal: boolean;
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
  setIsConfirmed: React.Dispatch<SetStateAction<boolean>>;
}
