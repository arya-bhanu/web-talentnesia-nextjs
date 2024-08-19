import { defaultQuestionRadio } from '@/backoffice/modules/manage-modul/components/form-exam/formExam.data';
import {
  APIExamChapter,
  ExamQuestion,
} from '@/backoffice/modules/manage-modul/manageModul.type';
import { create } from 'zustand';
interface QuestionExamState {
  question: ExamQuestion[];
  setNewQuestion: (newQuestion: ExamQuestion) => void;
  updateQuestion: (newQuestions: ExamQuestion[]) => void;
}

type ExamStore = {
  dataExam: Omit<APIExamChapter, 'exams'>;
  setDataExam: (data: Omit<APIExamChapter, 'exams'>) => void;
};

export const useExamStore = create<ExamStore>()((set) => ({
  dataExam: {
    chapterId: '',
    duration: '01:00',
    id: '',
    order: -1,
    title: '',
  },
  setDataExam: (newData) =>
    set((data) => ({
      dataExam: newData,
    })),
}));

export const useQuestionExamStore = create<QuestionExamState>()((set) => ({
  question: [defaultQuestionRadio],
  setNewQuestion: (newQuestion) =>
    set((prev) => {
      const old = [...prev.question];
      old.push(newQuestion);
      return {
        question: old,
      };
    }),
  updateQuestion: (newQuestions) =>
    set(() => ({
      question: newQuestions,
    })),
}));
