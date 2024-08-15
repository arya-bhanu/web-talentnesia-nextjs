import { SetStateAction } from 'react';

export interface APIResponseManageModul {
  id: string;
  code: string;
  name: string;
  active: number;
  chapters: APIChapterModul[] | null | undefined;
}

export interface APIContentChapter {
  chapterId: string;
  title: string;
  type: string;
  duration: string;
  body?: string;
  id: string;
  isexam: 0 | 1;
  order: number;
}

export interface APIChapterModul {
  description: string | null;
  duration: string | null;
  id: string;
  moduleId: string;
  order: number;
  title: string;
  contents: APIContentChapter[];
}

export interface APIExamChapter {
  chapterId: string;
  title: string;
  duration: string;
  exams: ExamQuestion[];
}

export interface ExamQuestion {
  question: string;
  type: 'radio' | 'textarea' | 'file';
  options:
    | {
        value: string;
        text: string;
      }[]
    | null;
}

export interface IManageModulView {
  data?: APIResponseManageModul[];
  openPopoverIndex: number;
  setOpenPopoverIndex: React.Dispatch<SetStateAction<number>>;
  handleActionButtonRow: (id: string, action: 'delete' | 'edit') => void;
}
