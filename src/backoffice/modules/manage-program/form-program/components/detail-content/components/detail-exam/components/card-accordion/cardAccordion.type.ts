import { Table } from '@tanstack/react-table';
import { studentDataProps } from '../../input-score/inputScore.type';

export type SoalType = {
  id: number;
  pertanyaan: string;
  jawaban: string;
  nilai: number;
  totalNilai: number;
};

export interface CardAccordionViewProps {
  studentData: studentDataProps[];
  openAccordions: number[];
  scores: { [key: string]: number };
  tableInstance: Table<SoalType>;
  toggleAccordion: (id: number) => void;
  handleScoreChange: (studentId: number, questionId: number, value: number) => void;
  calculateTotalScore: (studentId: number) => number;
}
