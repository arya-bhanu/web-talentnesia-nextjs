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
  date?: Date | null;
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
  id: string;
  order: number;
  chapterId: string;
  title: string;
  duration: string;
  exams: ExamQuestion[];
}

export interface ExamQuestion {
  id: string;
  title: string;
  type: 'radio' | 'textarea' | 'file';
  chapterId: string;
  options:
    | {
        value: string;
        text: string;
        id: string;
        order?: number;
        questionId?: string;
      }[]
    | null;
  order: number;
  active: null | any;
}

export interface IManageModulView {
  data: APIResponseManageModul[];
  Filter: string;
  openPopoverIndex: number;
  setFilter: React.Dispatch<SetStateAction<string>>;
  handleActionButtonRow: (id: string, action: 'delete' | 'edit', rowData?: string) => void;
  setOpenPopoverIndex: React.Dispatch<SetStateAction<number>>;
}
