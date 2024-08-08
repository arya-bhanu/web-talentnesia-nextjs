import { Dispatch, SetStateAction } from 'react';

export interface ITimeInput {
  time: Date;
  setTime: Dispatch<SetStateAction<Date>>;
  label?: {
    text: string;
    isImportant: boolean;
  };
}
