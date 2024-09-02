import { Dispatch, SetStateAction } from 'react';

export type IHistoryView = {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
};
