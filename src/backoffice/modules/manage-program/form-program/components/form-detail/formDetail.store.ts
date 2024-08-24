import { create } from 'zustand';
import { APIDetailForm } from './formDetail.type';
import { defaultDataFormDetail } from './formDetail.data';

export interface IFormDetailStore {
  data: APIDetailForm;
  setData: (newData: APIDetailForm) => void;
}

export const useFormDetailStore = create<IFormDetailStore>((set) => ({
  data: defaultDataFormDetail,
  setData: (newData) => set(() => ({ data: newData })),
}));
