import React, { FormEvent, useEffect, useState } from 'react';
import AccordionPanelDraggableView from './AccordionPanelDraggable.view';
import { IAccordionPanelDraggable } from './accordionPanelDraggable.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createContent,
  deleteChapter,
} from '../../form-program/components/form-course/api/formCourse.api';
import { useSearchParams } from 'next/navigation';
import {
  createMentoring,
  editMentoring,
} from '../../form-program/components/form-mentoring/api/formMentoring.api';
import { useFormMentoringStore } from '../../form-program/components/form-mentoring/formMentoring.store';
import { convertDateToStr, convertHHmmTime } from '@/helpers/formatter.helper';
import { useStatusModalStore } from '@/lib/store';
import AlertModal from '@/backoffice/components/alert-modal';
import { set } from 'date-fns';

const AccordionPanelDraggable: React.FC<
  IAccordionPanelDraggable & { index: number }
> = (props) => {
  const [openPopover, setOpenPopover] = useState(false);
  const [openModalMentoring, setOpenModalMentoring] = useState(false);
  const [openModalCertificate, setOpenModalCertificate] = useState(false);
  const [openModalGenerate, setOpenModalGenerate] = useState(false);
  const [openModalContent, setOpenModalContent] = useState(false);
  const queryClient = useQueryClient();
  const params = useSearchParams();
  const [openAlertModalMentoring, setOpenAlertModalMentoring] = useState(false);
  const [openAlertModalContent, setOpenAlertModalContent] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [tempMonitoringData, settempMonitoringData] = useState<FormData | null>(null);
  const [tempContentFormData, setTempContentFormData] = useState<{ formData: FormData, chapterId: string } | null>(null);
  const [alertMessageMonitoring, setAlertMessageMonitoring] = useState('');
  const [alertMessageContent, setAlertMessageContent] = useState('');

  const { openModal: openModalToast } = useStatusModalStore();
  const { idDefaultMentoring } = useFormMentoringStore();

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

  const { mutateAsync: editMentoringAsync } = useMutation({
    mutationKey: ['update', 'mentor'],
    mutationFn: editMentoring,
  });

  const { timeStart, date, timeEnd, clear } = useFormMentoringStore();

  const programId = params.get('programId');

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
  const handleOpenModalGenerate = (action: 'open' | 'close') => {
    if (action === 'close') {
      setOpenModalGenerate(false);
    } else {
      setOpenModalGenerate(true);
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
      openModalToast({
        status: 'success',
        action: 'delete',
        message: 'Chapter deleted successfully',
      });
    } catch (err) {
      console.error(err);
      openModalToast({
        status: 'error',
        action: 'delete',
        message: 'Failed to delete chapter',
      });
    }
  };

  useEffect(() => {
    if (isConfirmed && tempMonitoringData) {
      handleConfirmedMentoring(tempMonitoringData);
      settempMonitoringData(null);
      setIsConfirmed(false);
    }
  }, [isConfirmed]);
  
  const handleSubmitModalMentoring = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget);
    settempMonitoringData(formData);
    setAlertMessageMonitoring(idDefaultMentoring 
      ? 'Are you sure you want to update this mentoring session?'
      : 'Are you sure you want to add this new mentoring session?');
    setOpenAlertModalMentoring(true);
  };
  
  const handleConfirmedMentoring = async (formData: FormData) => {
    try {
      const title = formData.get('mentoring_name') as string;
      const mentorId = formData.get('mentor') as string;
      const startTime = timeStart;
      const endTime = timeEnd;
      const dateData = date;
      const location = null;
      const link = formData.get('url') as string;
        idDefaultMentoring
          ? await editMentoringAsync({
              mentoringId: idDefaultMentoring,
              payload: {
                link,
                location,
                title,
                chapterId: props.id,
                mentorId,
                endTime: convertHHmmTime(endTime),
                startTime: convertHHmmTime(startTime),
                date: convertDateToStr(new Date(dateData)),
              },
            })
          : await createMentorAsync({
              link,
              location,
              title,
              chapterId: props.id,
              mentorId,
              endTime: convertHHmmTime(endTime),
              startTime: convertHHmmTime(startTime),
              date: convertDateToStr(new Date(dateData)),
            });

        queryClient.invalidateQueries({
          queryKey: ['mentoring', 'list', props.id],
        });

        queryClient.invalidateQueries({
          queryKey: ['chapters', 'program', programId],
        });

        clear();
        setIsConfirmed(false);
        openModalToast({
          status: 'success',
          action: idDefaultMentoring ? 'update' : 'create',
          message: `Mentoring ${idDefaultMentoring ? 'updated' : 'created'} successfully`,
        });
    } catch (error) {
      console.error('Error submitting mentoring:', error);
      openModalToast({
        status: 'error',
        action: idDefaultMentoring ? 'update' : 'create',
        message: `Failed to ${idDefaultMentoring ? 'update' : 'create'} mentoring`,
      });
    }
  };

  const handleSubmitModalCertificate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmitModalGenerate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    if (isConfirmed && tempContentFormData) {
      handleConfirmedContent(tempContentFormData.formData, tempContentFormData.chapterId);
      setTempContentFormData(null);
      setIsConfirmed(false);
    }
  }, [isConfirmed]);
  
  const handleSubmitModalContent = (e: FormEvent<HTMLFormElement>, chapterId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget);
    setTempContentFormData({ formData, chapterId });
    setAlertMessageContent('Are you sure you want to add this new content?');
    setOpenAlertModalContent(true);
  };
  
  const handleConfirmedContent = async (formData: FormData, chapterId: string) => {
    try {
      const time = formData.get('time') as string;
      const title = formData.get('title') as string;
      const type = formData.get('type') as string;
      const fileUrl = formData.get('fileUrl') as string;
      const fileName = formData.get('fileName') as string;
      const convertedTime = time.substring(0, 5);
  
      if (chapterId && convertedTime && title && type && fileUrl) {
        await createContentProgramAsync({
          body: fileName,
          duration: convertedTime,
          title,
          type,
          chapterId,
          isexam: 0,
          file: fileUrl,
        });
        await queryClient.invalidateQueries({
          queryKey: ['chapters', 'program', params.get('programId')],
        });
        setOpenModalContent(false);
        openModalToast({
          status: 'success',
          action: 'create',
          message: 'Content added successfully',
        });
      }
    } catch (err) {
      console.error(err);
      openModalToast({
        status: 'error',
        action: 'create',
        message: 'Failed to add content',
      });
    }
  };

  return (
    <>
      <AccordionPanelDraggableView
        handleDeleteChapter={handleDeleteChapter}
        handleOpenModalMentoring={handleOpenModalMentoring}
        handleOpenModalCertificate={handleOpenModalCertificate}
        handleOpenModalGenerate={handleOpenModalGenerate}
        handleOpenModalContent={handleOpenModalContent}
        open={openPopover}
        setOpen={setOpenPopover}
        openModalMentoring={openModalMentoring}
        setOpenModalMentoring={setOpenModalMentoring}
        handleSubmitModalMentoring={handleSubmitModalMentoring}
        handleSubmitModalCertificate={handleSubmitModalCertificate}
        handleSubmitModalGenerate={handleSubmitModalGenerate}
        handleSubmitModalContent={handleSubmitModalContent}
        openModalContent={openModalContent}
        setOpenModalContent={setOpenModalContent}
        openModalCertificate={openModalCertificate}
        openModalGenerate={openModalGenerate}
        setOpenModalCertificate={setOpenModalCertificate}
        setOpenModalGenerate={setOpenModalGenerate}
        {...props}
      />
      <AlertModal
        openModal={openAlertModalMentoring}
        setOpenModal={setOpenAlertModalMentoring}
        setIsConfirmed={setIsConfirmed}
        messageText={alertMessageMonitoring}
      />
      <AlertModal
        openModal={openAlertModalContent}
        setOpenModal={setOpenAlertModalContent}
        setIsConfirmed={setIsConfirmed}
        messageText={alertMessageContent}
      />
    </>
  );
};
export default AccordionPanelDraggable;
