import { APIDetailProgram } from './../form-program/components/form-detail/formDetail.type';
import { Dispatch, SetStateAction } from 'react';

export interface CourseType {}

export interface CourseViewProps {
  data: APIDetailProgram[];
  Filter: string;
  setFilter: (value: string) => void;
  handleActionButtonRow: (
    id: string,
    action: 'delete',
    rowData?: string,
  ) => void;
}

export interface CourseProgramItemApiResponse {
  data: {
    items: APIDetailProgram[];
  }
}

export interface CourseStateType {
  popoverIndex: number;
  setPopoverIndex: Dispatch<SetStateAction<number>>;
  onDeleteClick: (id: string) => void;
}
