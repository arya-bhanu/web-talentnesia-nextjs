import { create } from 'zustand';
import { APIDetailProgramIICP } from '../form-program/components/form-detail/formDetail.type';

export interface IiICPStore {
  programs: APIDetailProgramIICP[] | null;
  setPrograms: (programs: APIDetailProgramIICP[]) => void;
}

export const useIICPStore = create<IiICPStore>((set) => ({
  programs: null,
  setPrograms: (newPrograms) => set({ programs: newPrograms }),
}));
