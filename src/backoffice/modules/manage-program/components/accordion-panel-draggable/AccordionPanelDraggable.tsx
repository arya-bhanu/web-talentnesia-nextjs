import React, { FormEvent, useState } from 'react';
import AccordionPanelDraggableView from './AccordionPanelDraggable.view';
import { IAccordionPanelDraggable } from './accordionPanelDraggable.type';

const AccordionPanelDraggable: React.FC<
  IAccordionPanelDraggable & { index: number }
> = (props) => {
  const [openPopover, setOpenPopover] = useState(false);
  const [openModalMentoring, setOpenModalMentoring] = useState(false);
  const [openModalCertificate, setOpenModalCertificate] = useState(false);
  const [openModalContent, setOpenModalContent] = useState(false);

  const handleOpenModalContent = (action: 'open' | 'close') => {
    if (action === 'close') {
      setOpenModalContent(false);
    } else {
      setOpenModalContent(true);
    }
  };

  const handleOpenModalMentoring = (action: 'open' | 'close') => {
    if (action === 'close') {
      setOpenModalMentoring(false);
    } else {
      setOpenModalMentoring(true);
    }
  };

  const handleOpenModalCertificate = (action: 'open' | 'close') => {
    if (action === 'close') {
      setOpenModalCertificate(false);
    } else {
      setOpenModalCertificate(true);
    }
  };

  const handleSubmitModalMentoring = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmitModalCertificate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmitModalContent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <AccordionPanelDraggableView
      handleOpenModalMentoring={handleOpenModalMentoring}
      handleOpenModalCertificate={handleOpenModalCertificate}
      handleOpenModalContent={handleOpenModalContent}
      open={openPopover}
      setOpen={setOpenPopover}
      openModalMentoring={openModalMentoring}
      setOpenModalMentoring={setOpenModalMentoring}
      handleSubmitModalMentoring={handleSubmitModalMentoring}
      handleSubmitModalCertificate={handleSubmitModalCertificate}
      handleSubmitModalContent={handleSubmitModalContent}
      openModalContent={openModalContent}
      setOpenModalContent={setOpenModalContent}
      openModalCertificate={openModalCertificate}
      setOpenModalCertificate={setOpenModalCertificate}
      {...props}
    />
  );
};

export default AccordionPanelDraggable;
