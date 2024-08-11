import { Dispatch, FormEvent, SetStateAction } from 'react';

export interface IFormChapter {
  handleSubmitAddContent: (e: FormEvent<HTMLFormElement>) => void;
  handleSubmitCreateChapter: (e: FormEvent<HTMLFormElement>) => void;
  stateFormAddContent: {
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
  };
  id?: string;
  setActionSubChapter: Dispatch<SetStateAction<'exam' | 'content'>>;
}
