import { SetStateAction } from 'react';

export interface IAlertDeleteModal {
  openModal: boolean;
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
  setIsConfirmed: React.Dispatch<SetStateAction<boolean>>;
}
