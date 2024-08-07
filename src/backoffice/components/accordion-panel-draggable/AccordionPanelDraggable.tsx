import React from 'react';
import AccordionPanelDraggableView from './AccordionPanelDraggable.view';
import { IAccordionPanelDraggable } from './accordionPanelDraggable.type';
import { IStateChapter } from '@/backoffice/modules/manage-modul/components/chapter/chapter.type';

const AccordionPanelDraggable: React.FC<
  IAccordionPanelDraggable & IStateChapter & { index: number }
> = (props) => {
  return <AccordionPanelDraggableView {...props} />;
};

export default AccordionPanelDraggable;
