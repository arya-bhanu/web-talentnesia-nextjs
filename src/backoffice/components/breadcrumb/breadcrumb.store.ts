import { create } from 'zustand';

interface IBreadCrumbStore {
  paramsQueries: {
    key: string;
    value: string;
  }[];
  setParamsQueries: (paramsQueries: { key: string; value: string }[]) => void;
}

export const useBreadCrumbStore = create<IBreadCrumbStore>((set) => {
  return {
    paramsQueries: [],
    setParamsQueries: (paramsQueries) => set({ paramsQueries: paramsQueries }),
  };
});
