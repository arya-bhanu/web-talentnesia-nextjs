import { Dispatch, SetStateAction } from 'react';

export interface IModalSelect extends IModalSelectState, IModalSelectOpenState {
  title: string;
  columns: {
    key: string;
    val: string;
  }[];
  rows: {}[];
}

export interface IModalSelectState {
  selected: any[];
  setSelected: Dispatch<SetStateAction<any[]>>;
}

export interface IModalSelectOpenState {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
