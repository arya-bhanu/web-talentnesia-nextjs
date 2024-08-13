import { Dispatch, SetStateAction } from 'react';
import { IListDraggable } from '@/backoffice/modules/manage-program/components/list-draggable/listDraggableType.type';

export interface IAccordionPanelDraggable extends IAccordionState {
  title: string;
  totalMinuteDuration: number;
  totalCurriculum: number;
  contents: IListDraggable[];
}

export interface IAccordionState {
  activeAccordion: number;
  setActiveAccordion: Dispatch<SetStateAction<number>>;
}

export interface IPopoverState {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
