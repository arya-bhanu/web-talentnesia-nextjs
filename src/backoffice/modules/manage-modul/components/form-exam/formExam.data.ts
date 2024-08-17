import { uuid } from 'uuidv4';
import { ExamQuestion } from '../../manageModul.type';

export const defaultQuestionRadio: ExamQuestion = {
  options: [
    {
      text: 'Option 1',
      value: 'option_1',
    },
  ],
  question: '',
  type: 'radio',
  keyId: "",
};


