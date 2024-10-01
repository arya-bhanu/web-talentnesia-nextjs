import { ExamQuestion } from '@/backoffice/modules/manage-modul/manageModul.type';
import { Dispatch, SetStateAction } from 'react';

export interface IQuestionListDraggable {
  openPopover: boolean;
  setOpenPopover: Dispatch<SetStateAction<boolean>>;
  id: string;
  questionType: Pick<ExamQuestion, 'type'>;
  options: { value: string; text: string; id: string; isCorrect: '0' | '1'; }[] | null;
}
