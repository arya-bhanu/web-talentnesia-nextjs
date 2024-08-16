import React, { FormEvent, useState } from 'react';
import AccordionPanelDraggableView from './AccordionPanelDraggable.view';
import { IAccordionPanelDraggable } from './accordionPanelDraggable.type';

const AccordionPanelDraggable: React.FC<
  IAccordionPanelDraggable & { index: number }
> = (props) => {
  const [openPopover, setOpenPopover] = useState(false);
  const [openModalMentoring, setOpenModalMentoring] = useState(false);

  const handleOpenModalMentoring = (action: 'open' | 'close') => {
    if (action === 'close') {
      setOpenModalMentoring(false);
    } else {
      setOpenModalMentoring(true);
    }
  };

  const handleSubmitModalMentoring = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <AccordionPanelDraggableView
      handleOpenModalMentoring={handleOpenModalMentoring}
      openModalMentoring={openModalMentoring}
      open={openPopover}
      setOpen={setOpenPopover}
      setOpenModalMentoring={setOpenModalMentoring}
      handleSubmitModalMentoring={handleSubmitModalMentoring}
      {...props}
    />
  );
};

export default AccordionPanelDraggable;
