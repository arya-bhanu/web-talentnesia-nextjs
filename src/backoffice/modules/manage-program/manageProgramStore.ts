import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface TabStoreManageProgram {
  activeTab: 'course' | 'iicp';
  setActiveTab: (tab: 'course' | 'iicp') => void;
  resetTab: () => void;
};

export const useTabStoreManageProgram = create<TabStoreManageProgram>()(
  devtools(
    (set) => ({
      activeTab: 'course',
      setActiveTab: (tab) => set((state) => ({ activeTab: tab }), false, 'setActiveTab'),
      resetTab: () => set({ activeTab: 'course' }, false, 'resetTab'),
    }),
    {
      name: 'Tab Store',
    }
  )
);