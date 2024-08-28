import React, { FormEvent, useState } from 'react';
import AccordionPanelDraggableView from './AccordionPanelDraggable.view';
import { IAccordionPanelDraggable } from './accordionPanelDraggable.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createContent,
  deleteChapter,
} from '../../form-program/components/form-course/api/formCourse.api';
import { useSearchParams } from 'next/navigation';
import { createMentoring } from '../../form-program/components/form-mentoring/api/formMentoring.api';
import { useFormMentoringStore } from '../../form-program/components/form-mentoring/formMentoring.store';
import { convertDateToStr, convertHHmmTime } from '@/helpers/formatter.helper';

const AccordionPanelDraggable: React.FC<
  IAccordionPanelDraggable & { index: number }
> = (props) => {
  const [openPopover, setOpenPopover] = useState(false);
  const [openModalMentoring, setOpenModalMentoring] = useState(false);
  const [openModalCertificate, setOpenModalCertificate] = useState(false);
  const [openModalContent, setOpenModalContent] = useState(false);
  const queryClient = useQueryClient();
  const params = useSearchParams();

  const { mutateAsync: deleteChapterAsync } = useMutation({
    mutationKey: ['delete', 'chapter'],
    mutationFn: deleteChapter,
  });

  const { mutateAsync: createContentProgramAsync } = useMutation({
    mutationFn: createContent,
    mutationKey: ['content', 'chapter', 'program'],
  });

  const { mutateAsync: createMentorAsync } = useMutation({
    mutationKey: ['create', 'mentor'],
    mutationFn: createMentoring,
  });

  const { timeStart, date, timeEnd } = useFormMentoringStore();

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
    const programId = params.get('programId');
    try {
      await deleteChapterAsync(idChapter);
      await queryClient.invalidateQueries({
        queryKey: ['chapters', 'program', programId],
      });
      setOpenPopover(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitModalMentoring = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('mentoring_name') as string;
    const mentorId = formData.get('mentor') as string;
    const startTime = timeStart;
    const endTime = timeEnd;
    const dateData = date;
    const location = null;
    const link = formData.get('url') as string;
    const response = await createMentorAsync({
      link,
      location,
      title,
      chapterId: props.id,
      mentorId,
      endTime: convertHHmmTime(endTime),
      startTime: convertHHmmTime(startTime),
      date: convertDateToStr(new Date(dateData)),
    });
    console.log(response);
  };

  const handleSubmitModalCertificate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmitModalContent = async (
    e: FormEvent<HTMLFormElement>,
    chapterId: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const formData = new FormData(e.currentTarget);
      const time = formData.get('time') as string;
      const title = formData.get('title') as string;
      const type = formData.get('type') as string;
      const uploadFile = formData.get('upload_file') as File;
      const convertedTime = time.substring(0, 5);
      if (chapterId && convertedTime && title && type && uploadFile) {
        await createContentProgramAsync({
          body: 'sample',
          duration: convertedTime,
          title,
          type,
          chapterId,
          isexam: 0,
        });
        await queryClient.invalidateQueries({
          queryKey: ['chapters', 'program', params.get('programId')],
        });
        setOpenModalContent(false);
      }
    } catch (err) {
      console.error(err);
    }
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
