import { create } from 'zustand';
import { APIDetailProgram } from '../form-program/components/form-detail/formDetail.type';

export interface ICourseStore {
  programs: APIDetailProgram[] | null;
  setPrograms: (programs: APIDetailProgram[]) => void;
}

export const useCourseStore = create<ICourseStore>((set) => ({
  programs: null,
  setPrograms: (newPrograms) => set({ programs: newPrograms }),
}));
