export interface Option {
  id: string;
  questionId: string;
  text: string;
  value: string;
  order: number;
}

export interface Exam {
  id: string;
  chapterId: string;
  contentId: string;
  title: string;
  type: string;
  order: number;
  active: number;
  createdBy: string | null;
  options?: Option[];
}

export interface TaskData {
  id: string;
  chapterId: string;
  title: string;
  type: string;
  duration: string;
  order: number;
  isexam: number;
  isCompleted: number;
  body: string | null;
  date: string;
  createdBy: string;
  exams: Exam[];
}

export interface Answer {
  questionId: string;
  optionId: string | null;
  valueText: string;
  originalFileName?: string;
}


export interface StoredAnswers {
  contentId: string;
  answers: Answer[];
}

// Add this to task.type.ts

export interface FileUploadResponse {
  success: boolean;
  code: number;
  status: string;
  fileOrigin: string;
  path: string | {
    origins: string;
    thumbs: string;
  };
}
