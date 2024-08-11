import { Dispatch, FormEvent, SetStateAction } from 'react';

export interface IFormChapter {
  handleSubmitAddContent: (e: FormEvent) => void;
  stateFormAddContent: {
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
  };
  id?: string;
}
