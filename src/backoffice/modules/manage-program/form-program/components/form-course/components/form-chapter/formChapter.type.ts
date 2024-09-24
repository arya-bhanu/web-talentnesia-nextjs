import { Dispatch, FormEvent, SetStateAction } from 'react';

import {
  APIChapterModul,
  APIContentChapter,
} from '@/backoffice/modules/manage-modul/manageModul.type';

export interface IFormChapter {
  handleSubmitAddContent: (e: FormEvent<HTMLFormElement>) => void;
  handleSubmitCreateChapter: (form: HTMLFormElement, action: 'addContent' | 'submit' | 'addExam') => void;
  stateFormAddContent: {
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
  };
  id?: string;
  setActionSubChapter: Dispatch<SetStateAction<'exam' | 'content'>>;
  contents: {
    data: APIContentChapter[] | undefined | null;
    isLoading: boolean;
  };
  defaultValueData: APIChapterModul | null | undefined;
}

export interface ISubmitType {
  type: 'nextSubmit' | 'defaultSubmit';
}
