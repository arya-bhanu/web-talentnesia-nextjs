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

export interface CardAccordionViewProps {
  studentData: StudentType[];
  openAccordions: string[];
  scores: { [key: string]: number };
  tableInstance: Table<QuestionType>;
  toggleAccordion: (id: string) => void;
  handleScoreChange: (studentId: string, questionId: string, value: number) => void;
  calculateTotalScore: (studentId: string) => number;
}
