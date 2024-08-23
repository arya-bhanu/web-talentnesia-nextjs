import { Dispatch, SetStateAction } from 'react';

export interface IICPType {}

export interface IICPStateType {
  popoverIndex: number;
  setPopoverIndex: Dispatch<SetStateAction<number>>;
}
