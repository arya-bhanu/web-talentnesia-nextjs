import { Dispatch, SetStateAction } from 'react';

export interface IAccordionPanelDraggable extends IAccordionState {
  title: string;
  totalMinuteDuration: number;
  totalCurriculum: number;
}

export interface IAccordionState {
  activeAccordion: number;
  setActiveAccordion: Dispatch<SetStateAction<number>>;
}

export interface IPopoverState {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
