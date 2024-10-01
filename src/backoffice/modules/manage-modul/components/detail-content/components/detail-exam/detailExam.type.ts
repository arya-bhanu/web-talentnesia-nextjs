import { APIContentChapterProps } from "../../detailContent.type";

export interface QuestionListProps {
  id: string;
  index: number;
  questionType: 'radio' | 'textarea' | 'file';
  content?: {
    data: {
      title: string;
      type: 'radio' | 'textarea' | 'file';
      options: {
        id: string;
        order: number;
        questionId: string;
        text: string;
        value: string;
      }[];
    };
  };
}


export interface ExamListProps extends APIContentChapterProps {
  exams?: {
    id: string;
    chapterId: string;
    contentId: string;
    order: number;
    title: string;
    type: 'radio' | 'textarea' | 'file';
    options: {
      id: string;
      order: number;
      questionId: string;
      text: string;
      value: string;
    }[];
  }[];
}

