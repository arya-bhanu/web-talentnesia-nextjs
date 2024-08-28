import React, { FormEvent, useState } from 'react';
import AccordionPanelDraggableView from './AccordionPanelDraggable.view';
import { IAccordionPanelDraggable } from './accordionPanelDraggable.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteChapter } from '../../form-program/components/form-course/api/formCourse.api';

const AccordionPanelDraggable: React.FC<
  IAccordionPanelDraggable & { index: number }
> = (props) => {
  const [openPopover, setOpenPopover] = useState(false);
  const [openModalMentoring, setOpenModalMentoring] = useState(false);
  const [openModalCertificate, setOpenModalCertificate] = useState(false);
  const [openModalContent, setOpenModalContent] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: deleteChapterAsync } = useMutation({
    mutationKey: ['delete', 'chapter'],
    mutationFn: deleteChapter,
  });

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

  const handleDeleteChapter = async (idChapter: string) => {
    try {
      await deleteChapterAsync(idChapter);
      await queryClient.invalidateQueries({ queryKey: ['course'] });
      setOpenPopover(false);
    } catch (err) {
      console.error(err);
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
      handleDeleteChapter={handleDeleteChapter}
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
