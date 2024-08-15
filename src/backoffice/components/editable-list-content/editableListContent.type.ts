import { APIContentChapter } from '@/backoffice/modules/manage-modul/manageModul.type';
import { Dispatch, FormEvent, SetStateAction } from 'react';

export type IEditableListContent = APIContentChapter;

export interface IEditOpenModalState {
  openModalEdit: boolean;
  setOpenModalEdit: Dispatch<SetStateAction<boolean>>;
}

export interface IEditHandler {
  handleSubmitEdit: (e: FormEvent<HTMLFormElement>) => void;
}
