import { Dispatch, SetStateAction } from 'react';
import { APIChapterModul } from '../../manageModul.type';

export interface IChapter {
  className?: string;
  data: {
    isLoading: boolean | undefined;
    chapters: APIChapterModul[] | null | undefined;
  };
}

export interface IStateChapter {
  activeAccordion: number;
  setActiveAccordion: Dispatch<SetStateAction<number>>;
}
