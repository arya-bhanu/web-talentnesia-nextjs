import { APIContentChapter } from '@/backoffice/modules/manage-modul/manageModul.type';
import { create } from 'zustand';

export interface IFormScheduleStore {
  content: APIContentChapter | null;
  setContent: (newContent: APIContentChapter) => void;
}

export const useFormScheduleStore = create<IFormScheduleStore>((set) => ({
  content: null,
  setContent: (newContent) => set({ content: newContent }),
}));
