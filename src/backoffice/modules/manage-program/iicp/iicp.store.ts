import { create } from 'zustand';
import { APIDetailProgram } from '../form-program/components/form-detail/formDetail.type';

export interface IiICPStore {
  programs: APIDetailProgram[] | null;
  setPrograms: (programs: APIDetailProgram[]) => void;
}

export const useIICPStore = create<IiICPStore>((set) => ({
  programs: null,
  setPrograms: (newPrograms) => set({ programs: newPrograms }),
}));
