import { Dispatch, SetStateAction } from 'react';

export interface IFormExam {}

export interface IFormExamState {
  time: Date;
  setTime: Dispatch<SetStateAction<Date>>;
}
