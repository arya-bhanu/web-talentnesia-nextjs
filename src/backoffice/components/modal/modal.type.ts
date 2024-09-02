import { Dispatch, FormEvent, ReactNode, SetStateAction } from 'react';

export interface IModalState {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export interface IModal {
  state: IModalState;
  children: ReactNode;
  title: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  buttonConfirmTitle?: string;
  isEdit?: boolean;
  childProps?: {
    id?: string;
  };
}
