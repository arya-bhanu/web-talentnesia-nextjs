import { APIContentChapter } from '@/backoffice/modules/manage-modul/manageModul.type';
import { Dispatch, FormEvent, SetStateAction } from 'react';

export interface IEditableListContent extends APIContentChapter {
  mentorId?: string;
  startTime?: string;
  endTime?: string;
  link?: string;
  ismonitoring?: boolean;
  datem?: Date;
}

export interface IEditOpenModalState {
  openModalEdit: boolean;
  setOpenModalEdit: Dispatch<SetStateAction<boolean>>;
}

export interface IEditHandler {
  handleSubmitEdit: (e: FormEvent<HTMLFormElement>) => void;
}


