import { Dispatch, ReactNode, SetStateAction } from 'react';
import { IListDraggable } from '../list-draggable/listDraggable.type';

export interface IAccordionPanelDraggable {
  panelTitle: string;
  totalMinuteDuration: number;
  totalCurriculum: number;
  contents: IListDraggable[];
}
