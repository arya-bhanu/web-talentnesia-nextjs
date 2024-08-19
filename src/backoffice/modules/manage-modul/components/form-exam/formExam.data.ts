import { v4 as uuid } from 'uuid';
import { ExamQuestion } from '../../manageModul.type';

export const defaultQuestionRadio: ExamQuestion = {
  options: [
    {
      text: 'Option 1',
      value: 'option_1',
      id: uuid().toString(),
    },
  ],
  question: '',
  type: 'radio',
  id: uuid().toString(),
};
