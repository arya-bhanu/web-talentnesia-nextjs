import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface TabStoreFormProgram {
  activeTab: 'detail' | 'course' | 'student';
  setActiveTab: (tab: 'detail' | 'course' | 'student') => void;
  resetTab: () => void;
};

export const useTabStoreFormProgram = create<TabStoreFormProgram>()(
  devtools(
    (set) => ({
      activeTab: 'detail',
      setActiveTab: (tab) => set((state) => ({ activeTab: tab }), false, 'setActiveTab'),
      resetTab: () => set({ activeTab: 'detail' }, false, 'resetTab'),
    }),
    {
      name: 'Tab Store',
    }
  )
);