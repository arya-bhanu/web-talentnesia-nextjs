import React from 'react';
import AccordionPanelDraggableView from './AccordionPanelDraggable.view';
import { IAccordionPanelDraggable } from './accordionPanelDraggable.type';

const AccordionPanelDraggable: React.FC<IAccordionPanelDraggable & { index: number }> = (props) => {
  return (
    <AccordionPanelDraggableView {...props} />
  );
};

export default AccordionPanelDraggable;
