import { Dispatch, FormEvent, SetStateAction } from 'react';
import { ExamQuestion } from '../../manageModul.type';

export type IFormExam = {
  handleSubmitExam: (e: FormEvent<HTMLFormElement>) => void;
};

export interface IQuestionExamState {
  setQuestion: Dispatch<SetStateAction<ExamQuestion[]>>;
  question: ExamQuestion[];
}
