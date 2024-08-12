import { Dispatch, FormEvent, SetStateAction } from 'react';
import { APIChapterModul, APIContentChapter } from '../../manageModul.type';

export interface IFormChapter {
  handleSubmitAddContent: (e: FormEvent<HTMLFormElement>) => void;
  handleSubmitCreateChapter: (e: FormEvent<HTMLFormElement>) => void;
  stateFormAddContent: {
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
  };
  id?: string;
  setActionSubChapter: Dispatch<SetStateAction<'exam' | 'content'>>;
  contents: APIContentChapter[] | undefined | null;
  defaultValueData: APIChapterModul | null | undefined;
}
