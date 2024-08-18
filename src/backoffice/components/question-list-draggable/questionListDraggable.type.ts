import { ExamQuestion } from '@/backoffice/modules/manage-modul/manageModul.type';
import { Dispatch, SetStateAction } from 'react';

export interface IQuestionListDraggable {
  openPopover: boolean;
  setOpenPopover: Dispatch<SetStateAction<boolean>>;
  keyId: string;
  questionType: Pick<ExamQuestion, 'type'>;
  options: { value: string; text: string; keyOption: string }[] | null;
}
