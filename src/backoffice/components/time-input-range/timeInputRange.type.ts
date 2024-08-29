import { Dispatch, SetStateAction } from 'react';

export interface ITimeInputRange {
  className?: string;
  label: {
    text: string;
    isImportant: boolean;
  };
  timeStart: Date;
  setTimeStart: Dispatch<SetStateAction<Date>>;
  timeEnd: Date;
  setTimeEnd: Dispatch<SetStateAction<Date>>;
}
