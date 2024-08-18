import { defaultQuestionRadio } from '@/backoffice/modules/manage-modul/components/form-exam/formExam.data';
import { ExamQuestion } from '@/backoffice/modules/manage-modul/manageModul.type';
import { create } from 'zustand';
interface QuestionExamState {
  question: ExamQuestion[];
  setNewQuestion: (newQuestion: ExamQuestion) => void;
  updateQuestion: (newQuestions: ExamQuestion[]) => void;
}

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
