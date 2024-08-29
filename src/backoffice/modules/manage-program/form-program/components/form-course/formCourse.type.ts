import { APIChapterModul } from '@/backoffice/modules/manage-modul/manageModul.type';
import { Dispatch, FormEvent, SetStateAction } from 'react';

export interface IFormCourse {}

export interface IHandlerFormCourse {
  handleSubmitSelectedModul: (e: FormEvent<HTMLFormElement>) => void;
}

export interface IStateFormCourse {
  openModalModul: boolean;
  setOpenModalModul: Dispatch<SetStateAction<boolean>>;
}

export interface IFormCourse {
  id: string;
  name: string;
  progress: number;
  chapters: APIChapterModul[];
}
