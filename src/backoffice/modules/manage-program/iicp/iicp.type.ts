import { APIDetailProgramIICP } from './../form-program/components/form-detail/formDetail.type';
import { Dispatch, SetStateAction } from 'react';

export interface IICPType {}

export interface IICPViewProps {
  data: APIDetailProgramIICP[];
  Filter: string;
  setFilter: (value: string) => void;
  handleActionButtonRow: (
    id: string,
    action: 'delete',
    rowData?: string,
  ) => void;
}

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
