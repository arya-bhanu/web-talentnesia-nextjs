'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import FormCourseView from './FormCourse.view';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addCourseChapterDefault,
  fetchChapterCourse,
  fetchModule,
} from './api/formCourse.api';
import { useFormCourseStore } from './formCourse.store';
import { useSearchParams } from 'next/navigation';
import { useStatusModalStore } from '@/lib/store';
import AlertModal from '@/backoffice/components/alert-modal';

const FormCourse = () => {
  const [openModalModul, setOpenModalModul] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [formEvent, setFormEvent] = useState<FormEvent<HTMLFormElement> | null>(null);
  const params = useSearchParams();
  const programId = params.get('programId');
  const queryClient = useQueryClient();
  const { setModules, setData, activeModule, setActiveModule } = useFormCourseStore();
  const { openModal: openModalToast } = useStatusModalStore();

  const { data: programChapters, isLoading: isLoadingProgramChapters } =
    useQuery({
      queryKey: ['chapters', 'program', programId],
      queryFn: () => fetchChapterCourse(programId),
    });

  const { data: modules, isLoading: isLoadingModules } = useQuery({
    queryKey: ['save-module'],
    queryFn: fetchModule,
  });

  const { mutateAsync: addChapterDefault } = useMutation({
    mutationKey: ['add-chapter', 'default'],
    mutationFn: addCourseChapterDefault,
  });

  useEffect(() => {
    if (programChapters?.data?.data) {
      setData(programChapters?.data?.data);
    }
  }, [JSON.stringify(programChapters?.data?.data)]);

  useEffect(() => {
    if (modules?.data?.data) {
      setModules(modules?.data?.data);
      if (!activeModule) {
        setActiveModule(modules?.data?.data[0].id);
      }
    }
  }, [JSON.stringify(modules?.data?.data)]);

  useEffect(() => {
    if (isConfirmed && formEvent) {
      handleSubmitSelectedModul(formEvent);
      setIsConfirmed(false);
      setFormEvent(null);
    }
  }, [isConfirmed, formEvent]);

  const handleSubmitClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormEvent(e);
    setOpenAlertModal(true);
    if (isConfirmed) {
    await handleSubmitSelectedModul(e);
    }
  };

  const handleSubmitSelectedModul = async (e: FormEvent<HTMLFormElement>) => {
    if (!(e.target instanceof HTMLFormElement)) {
      console.error('Invalid form event');
      return;
    }
    const formData = new FormData(e.target);
    const selectModule = formData.get('modul') as string;
    
    try {
      await addChapterDefault({
        modulId: selectModule,
        programId,
      });

      await queryClient.invalidateQueries({
        queryKey: ['chapters', 'program', programId],
      });
      setActiveModule(selectModule as string);
      setOpenModalModul(false);
      openModalToast({
        status: 'success',
        action: 'create',
        message: 'Module added successfully',
      });
    } catch (error) {
      console.error('Error adding module:', error);
      openModalToast({
        status: 'error',
        action: 'create',
        message: 'Failed to add module. Please try again.',
      });
    }
  };

  return (
    <>
      <FormCourseView
        handleSubmitSelectedModul={handleSubmitClick}
        setOpenModalModul={setOpenModalModul}
        openModalModul={openModalModul}
      />
      <AlertModal
        openModal={openAlertModal}
        setOpenModal={setOpenAlertModal}
        setIsConfirmed={setIsConfirmed}
        messageText="Are you sure you want to add this module?"
      />
    </>
  );
};

export default FormCourse;
