import { Dispatch, SetStateAction } from 'react';
import { ExamQuestion } from '../../manageModul.type';

export interface IFormExam {}

export interface IFormExamState {
  time: Date;
  setTime: Dispatch<SetStateAction<Date>>;
}

export interface IQuestionExamState {
  setQuestion: Dispatch<SetStateAction<ExamQuestion[]>>;
  question: ExamQuestion[];
}
