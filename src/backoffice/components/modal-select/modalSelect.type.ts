import { Dispatch, SetStateAction } from 'react';

export interface IModalSelect extends IModalSelectState, IModalSelectOpenState {
  columns: Array<{ key: string; val: string }>;
  rows: Array<{
    no: number;
    name: () => JSX.Element | string;
    periode: string;
    id: number | string;
  }>;
  title?: string;
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
}

export interface IModalSelectState {
  selected: string[];
  setSelected: Dispatch<SetStateAction<any[]>>;
}

export interface IModalSelectOpenState {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
