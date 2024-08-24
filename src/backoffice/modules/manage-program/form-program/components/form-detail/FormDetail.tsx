'use client';
import React, { FormEvent, useEffect } from 'react';
import FormDetailView from './FormDetail.view';
import { useSearchParams } from 'next/navigation';
import { useFormDetailStore } from './formDetail.store';
import { useQuery } from '@tanstack/react-query';
import { fetchMentors } from './api/formDetail.api';

const FormDetail = () => {
  const params = useSearchParams();
  const programId = params.get('programId');
  const { data, setData } = useFormDetailStore();

  const { data: dataMentors, isLoading: isLoadingMentors } = useQuery({
    queryKey: ['mentors'],
    queryFn: fetchMentors,
  });

  useEffect(() => {
    console.log(dataMentors?.data);
  }, [JSON.stringify(dataMentors?.data)]);

  const handleSubmitFormDetail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget);
    const programName = formData.get('program_name');
    const active = formData.get('active');
    const mentor = data.mentors;
    const filePic = data.image;
    const startDate = formData.get('start_date');
    const endDate = formData.get('end_date');
    const school = formData.get('school');

    console.log(programName, active, mentor, startDate, endDate, school);
    console.log(filePic);
  };
  return (
    <FormDetailView
      programId={programId || undefined}
      handleSubmitForm={handleSubmitFormDetail}
      isLoadingMentors={isLoadingMentors}
    />
  );
};

export default FormDetail;
