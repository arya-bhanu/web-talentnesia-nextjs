import { Dispatch, SetStateAction } from 'react';

export interface IModalSelect extends IModalSelectState, IModalSelectOpenState {
  title: string;
  columns: {
    key: string;
    val: string;
  }[];
  rows: Record<string, string | number | boolean | (() => React.ReactNode)>[];
}

export interface IModalSelectState {
  selected: string[];
  setSelected: Dispatch<SetStateAction<any[]>>;
}

export interface IModalSelectOpenState {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
