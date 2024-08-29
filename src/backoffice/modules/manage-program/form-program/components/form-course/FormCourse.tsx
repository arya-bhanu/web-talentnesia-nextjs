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

const FormCourse = () => {
  const [openModalModul, setOpenModalModul] = useState(false);
  const params = useSearchParams();
  const programId = params.get('programId');
  const queryClient = useQueryClient();
  const { setModules, setData, activeModule, setActiveModule } =
    useFormCourseStore();

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

  const handleSubmitSelectedModul = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectModule = formData.get('modul') as string;
    await addChapterDefault({
      modulId: selectModule,
      programId,
    });

    await queryClient.invalidateQueries({
      queryKey: ['chapters', 'program', programId],
    });
    setActiveModule(selectModule as string);
    setOpenModalModul(false);
  };

  return (
    <FormCourseView
      handleSubmitSelectedModul={handleSubmitSelectedModul}
      setOpenModalModul={setOpenModalModul}
      openModalModul={openModalModul}
    />
  );
};

export default FormCourse;
