import { APIResponseManageModul } from '@/backoffice/modules/manage-modul/manageModul.type';
import { create } from 'zustand';
import { IFormCourse } from './formCourse.type';

export interface IFormCourseStore {
  data: IFormCourse | null;
  setData: (newData: IFormCourse | null) => void;
  modules: APIResponseManageModul[] | null;
  setModules: (newData: APIResponseManageModul[] | null) => void;
  activeModule: string | null;
  setActiveModule: (activeModule: string | null) => void;
}

export const useFormCourseStore = create<IFormCourseStore>((set) => ({
  data: null,
  setData: (newData) => set({ data: newData }),
  modules: null,
  setModules: (newModules) => set({ modules: newModules }),
  activeModule: '',
  setActiveModule: (newModule) => set({ activeModule: newModule }),
}));
