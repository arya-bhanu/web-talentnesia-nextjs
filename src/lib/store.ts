import { defaultQuestionRadio } from '@/backoffice/modules/manage-modul/components/form-exam/formExam.data';
import {
  APIChapterModul,
  APIContentChapter,
  APIExamChapter,
  ExamQuestion,
} from '@/backoffice/modules/manage-modul/manageModul.type';
import { convertHHmmTime } from '@/helpers/formatter.helper';
import { Active, Over } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { create } from 'zustand';

const timeDate = new Date();
timeDate.setHours(1);
timeDate.setMinutes(0);
interface QuestionExamState {
  question: ExamQuestion[];
  setNewQuestion: (newQuestion: ExamQuestion) => void;
  updateQuestion: (newQuestions: ExamQuestion[]) => void;
}

interface ExamStore {
  dataExam: Omit<APIExamChapter, 'exams'>;
  setDataExam: (data: Omit<APIExamChapter, 'exams'>) => void;
  setTime: (time: Date) => void;
}
interface DragContents {
  sortContents: APIContentChapter[] | null | undefined;
  sortActionContents: (active: Active, over: Over) => void;
  setSortContents: (data: APIContentChapter[] | null | undefined) => void;
}
interface DragPosition {
  sortChapters: APIChapterModul[] | null | undefined;
  setSortChapters: (data: APIChapterModul[] | null | undefined) => void;
  sortActionChapters: (active: Active, over: Over) => void;
}

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

  setTime: (time: Date) =>
    set((prev) => {
      const { duration, ...rest } = prev.dataExam;
      return {
        dataExam: {
          duration: convertHHmmTime(time),
          ...rest,
        },
      };
    }),
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

export const useDragChapters = create<DragPosition>()((set) => ({
  sortChapters: null,

  setSortChapters: (data) =>
    set(() => ({
      sortChapters: data,
    })),

  sortActionChapters: (active, over) => {
    return set((prevData) => {
      if (prevData.sortChapters) {
        const oldIndex = prevData.sortChapters.findIndex(
          (item) => item.id === active.id,
        );
        const newIndex = prevData.sortChapters.findIndex(
          (item) => item.id === over.id,
        );
        return {
          sortChapters: arrayMove(prevData.sortChapters, oldIndex, newIndex),
        };
      }
      return {
        ...prevData,
      };
    });
  },
}));

export const useDragContents = create<DragContents>((set) => ({
  sortContents: null,

  setSortContents: (data) => {
    return set(() => ({
      sortContents: data,
    }));
  },

  sortActionContents: (active, over) => {
    console.log('action contents');
    return set((prevData) => {
      if (prevData.sortContents) {
        const oldIndex = prevData.sortContents.findIndex(
          (item) => item.id === active.id,
        );
        const newIndex = prevData.sortContents.findIndex(
          (item) => item.id === over.id,
        );
        return {
          sortContents: arrayMove(prevData.sortContents, oldIndex, newIndex),
        };
      }
      return {
        ...prevData,
      };
    });
  },
}));
