'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import EditableListContentView from './EditableListContent.view';
import { IEditableListContent } from './editableListContent.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteContent,
  editContent,
  deleteExam,
} from '../../api/formCourse.api';
import AlertModal from '@/backoffice/components/alert-modal';
import { useStatusModalStore } from '@/lib/store';
import { useFormMentoringStore } from '../../../form-mentoring/formMentoring.store';
import { editMentoring } from '../../../form-mentoring/api/formMentoring.api';
import { convertDateToStr, convertHHmmTime, convertTimeHHmmssToDate } from '@/helpers/formatter.helper';

const EditableListContent: React.FC<IEditableListContent> = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [isConfirmDel, setIsConfirmDel] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openAlertModalEdit, setOpenAlertModalEdit] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [tempFormData, setTempFormData] = useState<FormData | null>(null);
  const [alertMessageEdit, setAlertMessageEdit] = useState('');
  const [modalEditMentoring, setModalEditMentoring] = useState(false);
  const [tempMentoringFormData, setTempMentoringFormData] = useState<FormData | null>(null);
  const [openAlertModalMentoring, setOpenAlertModalMentoring] = useState(false);
  const [alertMessageMentoring, setAlertMessageMentoring] = useState('');
  const [isConfirmedMentoring, setIsConfirmedMentoring] = useState(false);
  const { openModal: openModalToast } = useStatusModalStore();
  const {
    setDefaultMentoring,
    setTimeStart,
    setTimeEnd,
    setDate,
    setIdDefaultMentoring,
    timeStart,
    date,
    timeEnd,
    idDefaultMentoring,
    clear,
  } = useFormMentoringStore();

  const queryClient = useQueryClient();

  const { mutateAsync: deleteContentAsync } = useMutation({
    mutationFn: deleteContent,
    mutationKey: ['content'],
  });

  const { mutateAsync: deleteExamAsync } = useMutation({
    mutationKey: ['content'],
    mutationFn: deleteExam,
  });

  const { mutateAsync: editContentAsync } = useMutation({
    mutationFn: editContent,
    mutationKey: ['content'],
  });

  const { mutateAsync: editMentoringAsync } = useMutation({
    mutationKey: ['update', 'mentor'],
    mutationFn: editMentoring,
  });

  useEffect(() => {
    (async function () {
      if (isConfirmDel) {
        await handleDeleteContent(Boolean(props.isexam), props.id);
        await queryClient.invalidateQueries({ queryKey: ['chapter'] });
        await queryClient.invalidateQueries({ queryKey: ['content'] });
        await queryClient.invalidateQueries({ queryKey: ['modules'] });
      }
    })();
  }, [isConfirmDel]);

  const handleDeleteContent = async (isexam: boolean, id: string) => {
    try {
      isexam ? await deleteContentAsync(id) : await deleteExamAsync(id);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isConfirmed) {
      if (tempFormData) {
        handleConfirmedEditContent(tempFormData);
      }
      setTempFormData(null);
      setIsConfirmed(false);
      setIsConfirmDel(false);
    }
  }, [isConfirmed]);

  
  useEffect(() => {
    if (isConfirmedMentoring && tempMentoringFormData) {
      handleConfirmedEditMentoring(tempMentoringFormData);
      setTempMentoringFormData(null);
      setIsConfirmedMentoring(false);
    }
  }, [isConfirmedMentoring]);


  const handleEditContent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setTempFormData(formData);
    setAlertMessageEdit('Are you sure you want to edit this content?');
    setOpenAlertModalEdit(true);
  };

  const handleConfirmedEditContent = async (formData: FormData) => {
    const time = formData.get('time') as string;
    const title = formData.get('title') as string;
    const type = formData.get('type') as string;
    const fileUrl = formData.get('fileUrl') as string;
    const fileName = formData.get('fileName') as string;

    if (props.id) {
      await editContentAsync({
        contentId: props.id,
        payload: {
          duration: time,
          title,
          type,
          body: fileName,
          isexam: 0,
          chapterId: props.chapterId,
          id: props.id,
          order: props.order,
          file: fileUrl,
        },
      });
      await queryClient.invalidateQueries({ queryKey: ['chapter'] });
      await queryClient.invalidateQueries({ queryKey: ['content'] });
      await queryClient.invalidateQueries({ queryKey: ['modules'] });
      setOpenModalEdit(false);
    }
  };

  const handleEditMentoring = () => {
    setDefaultMentoring({
      title: props.title,
      mentorId: props.mentorId || '',
      startTime: props.startTime || '',
      endTime: props.endTime || '',
      date: props.date ? props.date.toString() : '',
      link: props.link || '',
      location: null,
    });

    setTimeStart(convertTimeHHmmssToDate(props.startTime || ''));
    setTimeEnd(convertTimeHHmmssToDate(props.endTime || ''));
    setDate(props.date?.toString() ?? '');
    setIdDefaultMentoring(props.id);

    setModalEditMentoring(true);
  };

  const handleSubmitModalMentoring = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget);
    setTempMentoringFormData(formData);
    setAlertMessageMentoring('Are you sure you want to save these changes?');
    setOpenAlertModalMentoring(true);
  };

  const handleConfirmedEditMentoring = async (formData: FormData) => {
    try {
      console.log(formData);
      const title = formData.get('mentoring_name') as string;
      const mentorId = formData.get('mentor') as string;
      const link = formData.get('url') as string;

      await editMentoringAsync({
        mentoringId: idDefaultMentoring || '',
        payload: {
          link,
          location: null,
          title,
          chapterId: props.chapterId,
          mentorId,
          endTime: convertHHmmTime(timeEnd),
          startTime: convertHHmmTime(timeStart),
          date: convertDateToStr(new Date(date)),
        },
      });

      queryClient.invalidateQueries({
        queryKey: ['mentoring', 'list', props.chapterId],
      });
      openModalToast({
        status: 'success',
        action: 'update',
        message: 'Mentoring updated successfully',
      });
    } catch (error) {
      openModalToast({
        status: 'error',
        action: 'update',
        message: 'Failed to update mentoring',
      });
    }
  };


  return (
    <>
      <EditableListContentView
        handleSubmitEdit={handleEditContent}
        openModalEdit={openModalEdit}
        setOpenModalEdit={setOpenModalEdit}
        {...props}
        isConfirmed={isConfirmDel}
        openModal={openModal}
        setIsConfirmed={setIsConfirmDel}
        setOpenModal={setOpenModal}
        modalEditMentoring={modalEditMentoring}
        setModalEditMentoring={setModalEditMentoring}
        handleEditMentoring={handleEditMentoring}
        handleSubmitModalMentoring={handleSubmitModalMentoring}
      />
      <AlertModal
        openModal={openAlertModalEdit}
        setOpenModal={setOpenAlertModalEdit}
        setIsConfirmed={setIsConfirmed}
        messageText={alertMessageEdit}
      />
    </>
  );
};

export default EditableListContent;
