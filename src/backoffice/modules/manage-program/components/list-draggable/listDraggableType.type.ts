import { Dispatch, SetStateAction } from 'react';

export interface IListDraggable {
  title: string;
  type: string;
  date: Date;
  className?: string;
  durationMinute: number;
}

export interface IListDraggableState {
  modalSchedule: boolean;
  setModalSchedule: Dispatch<SetStateAction<boolean>>;
}
