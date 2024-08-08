import { Dispatch, SetStateAction } from 'react';

export interface IFormContent {
  time: Date;
  setTime: Dispatch<SetStateAction<Date>>;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}
