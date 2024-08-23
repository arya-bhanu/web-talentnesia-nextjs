import { Dispatch, SetStateAction } from 'react';

export interface IFormMentoring {
  timeInputState: ITimeInput;
}

export interface ITimeInput {
  time: Date;
  setTime: Dispatch<SetStateAction<Date>>;
}
