import { Dispatch, SetStateAction } from 'react';

export interface IChapter {
  className?: string;
}

export interface IStateChapter {
  activeAccordion: number;
  setActiveAccordion: Dispatch<SetStateAction<number>>;
}
