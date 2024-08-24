import { Dispatch, FormEvent, SetStateAction } from 'react';

export interface IFormCourse {}

export interface IHandlerFormCourse {
  handleSubmitSelectedModul: (e: FormEvent<HTMLFormElement>) => void;
}

export interface IStateFormCourse {
  openModalModul: boolean;
  setOpenModalModul: Dispatch<SetStateAction<boolean>>;
  activeAccordion: number;
  setActiveAccordion: Dispatch<SetStateAction<number>>;
}
