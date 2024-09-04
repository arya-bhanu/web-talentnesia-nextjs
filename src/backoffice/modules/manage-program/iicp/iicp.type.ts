import { APIDetailProgramIICP } from './../form-program/components/form-detail/formDetail.type';
import { Dispatch, SetStateAction } from 'react';

export interface IICPType {}

export interface IICPProgramItemApiResponse {
  data: {
    items: APIDetailProgramIICP[];
  }
}

export interface IICPStateType {
  popoverIndex: number;
  setPopoverIndex: Dispatch<SetStateAction<number>>;
  onDeleteClick: (id: string) => void;
}
