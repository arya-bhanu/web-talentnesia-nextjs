import React, { useState } from 'react';
import AccordionPanelDraggableView from './AccordionPanelDraggable.view';
import { IAccordionPanelDraggable } from './accordionPanelDraggable.type';

const AccordionPanelDraggable: React.FC<IAccordionPanelDraggable & { index: number }> = (props) => {
  const [openPopover, setOpenPopover] = useState(false);
  return (
    <AccordionPanelDraggableView
      open={openPopover}
      setOpen={setOpenPopover}
      {...props}
    />
  );
};

export default AccordionPanelDraggable;
