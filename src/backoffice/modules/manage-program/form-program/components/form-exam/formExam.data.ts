import { ExamQuestion } from '@/backoffice/modules/manage-modul/manageModul.type';
import { v4 as uuid } from 'uuid';

export const defaultExamData = {
  chapterId: '',
  duration: '01:00',
  id: '',
  order: -1,
  title: '',
  type: 5,
};

export const defaultOptionRadio = [
  {
    text: 'Option 1',
    value: 'option_1',
    id: uuid().toString(),
  },
];

export const defaultQuestionRadio: ExamQuestion = {
  options: [
    {
      text: 'Option 1',
      value: 'option_1',
      id: uuid().toString(),
    },
  ],
  title: '',
  type: 'radio',
  id: uuid().toString(),
  chapterId: '',
  order: -1,
  active: null,
};
