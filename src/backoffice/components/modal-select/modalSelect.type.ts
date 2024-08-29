import { Dispatch, SetStateAction } from 'react';

export interface IModalSelect extends IModalSelectState, IModalSelectOpenState {
  title: string;
}

export interface IModalSelectState {
  selected: any[];
  setSelected: Dispatch<SetStateAction<any[]>>;
}

export interface IModalSelectOpenState {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
