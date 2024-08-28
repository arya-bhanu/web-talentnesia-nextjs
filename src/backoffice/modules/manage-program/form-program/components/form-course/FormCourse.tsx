'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import FormCourseView from './FormCourse.view';
import { useQuery } from '@tanstack/react-query';
import { fetchCourseData, fetchModule } from './api/formCourse.api';
import { useFormCourseStore } from './formCourse.store';
import { useSearchParams } from 'next/navigation';

const FormCourse = () => {
  const [openModalModul, setOpenModalModul] = useState(false);
  const params = useSearchParams();
  const programId = params.get('programId');
  const {
    setModules,
    modules: modulesStored,
    setData,
    data,
    activeModule,
    setActiveModule,
  } = useFormCourseStore();

  const { data: modules, isLoading: isLoadingModules } = useQuery({
    queryKey: ['modules', 'save'],
    queryFn: fetchModule,
  });

  const { data: course, isLoading: isLoadingCourse } = useQuery({
    queryKey: ['course', activeModule, programId],
    queryFn: () => {
      console.log('refetch courses');
      return fetchCourseData({
        modulId: activeModule,
        programId: programId,
      });
    },
  });

  useEffect(() => {
    if (modules?.data?.data) {
      setModules(modules?.data?.data);
      if (!activeModule) {
        setActiveModule(modules?.data?.data[0].id);
      }
    }
  }, [JSON.stringify(modules?.data?.data)]);

  useEffect(() => {
    if (course?.data?.data) {
      setData(course?.data?.data);
    }
  }, [JSON.stringify(course?.data?.data)]);

  const handleSubmitSelectedModul = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectModule = formData.get('modul');
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
