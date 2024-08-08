import { Dispatch, SetStateAction } from 'react';

export interface IQuestionListDraggable {
  openPopover: boolean;
  setOpenPopover: Dispatch<SetStateAction<boolean>>;
  questionType: string;
  setQuestionType: Dispatch<SetStateAction<string>>;
}
