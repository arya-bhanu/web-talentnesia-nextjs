import { Table } from '@tanstack/react-table';

export type QuestionType = {
  id: string;
  chapterId: string;
  contentId: string;
  title: string;
  type: string;
  order: number;
  active: number;
  createdBy: string | null;
  answer: string | null;
};

export type StudentType = {
  userId: string;
  name: string;
  email: string;
  nis: string | null;
  phone: string;
  photo: string | null;
  createdBy: string | null;
  questions: QuestionType[];
};

export type ScoreType = {
  questionId: string;
  answerId: string | null;
  score: number;
};

export interface CardAccordionViewProps {
  studentData: StudentType[];
  openAccordions: string[];
  getScores: (userId: string) => ScoreType[];
  tableInstance: Table<QuestionType>;
  toggleAccordion: (id: string) => void;
  handleScoreChange: (studentId: string, questionId: string, value: string) => void;
  calculateTotalScore: (studentId: string) => number;
  handleSubmit: (studentId: string, contentId: string) => Promise<void>;
  contentId: string;
}
