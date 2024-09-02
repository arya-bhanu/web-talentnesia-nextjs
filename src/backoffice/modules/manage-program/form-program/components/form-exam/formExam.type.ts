import { ExamQuestion } from '@/backoffice/modules/manage-modul/manageModul.type';
import { Dispatch, FormEvent, SetStateAction } from 'react';

export type IFormExam = {
  handleSubmitExam: (e: FormEvent<HTMLFormElement>) => void;
};

export interface IQuestionExamState {
  setQuestion: Dispatch<SetStateAction<ExamQuestion[]>>;
  question: ExamQuestion[];
}
