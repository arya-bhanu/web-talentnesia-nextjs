'use client';
import React, { FormEvent, useEffect } from 'react';
import FormDetailView from './FormDetail.view';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFormDetailStore } from './formDetail.store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createProgram,
  fetchMentors,
  fetchSchools,
} from './api/formDetail.api';
import { Mentor } from '@/backoffice/components/mentor-selector/mentorSelector.type';
import { Schools } from './formDetail.type';
import { convertIntoNumericDate } from '@/helpers/formatter.helper';
import { defaultDataFormDetail } from './formDetail.data';

const FormDetail = () => {
  const params = useSearchParams();
  const queryClient = useQueryClient();
  const programId = params.get('programId');
  const router = useRouter();
  const { data, setData, setDefaultMentors, setDefaultSchools } =
    useFormDetailStore();

  const { data: dataMentors, isLoading: isLoadingMentors } = useQuery({
    queryKey: ['mentors'],
    queryFn: fetchMentors,
  });

  const { data: dataSchools, isLoading: isLoadingSchools } = useQuery({
    queryKey: ['schools'],
    queryFn: fetchSchools,
  });

  const { mutateAsync: createProgramAsync, isPending: isLoadingMutateProgram } =
    useMutation({
      mutationKey: ['program'],
      mutationFn: createProgram,
    });

  useEffect(() => {
    if (dataMentors?.data?.data) {
      setDefaultMentors(
        dataMentors.data.data.map((el: any) => {
          return {
            id: el.id,
            name: el.name,
          } as Mentor;
        }),
      );
    }
    if (dataSchools?.data?.data) {
      setDefaultSchools(
        dataSchools.data.data.map((el: any) => {
          return {
            id: el.id,
            name: el.name,
          } as Schools;
        }),
      );
    }
  }, [JSON.stringify(dataMentors?.data), JSON.stringify(dataSchools?.data)]);

  const handleSubmitFormDetail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget);
    const programName = formData.get('program_name') as string;
    const active = Number(formData.get('active') as string) as 0 | 1;
    const mentors = data.mentors.map((el) => el.id);
    const filePic = data.image;
    const startDate = formData.get('start_date') as string;
    const endDate = formData.get('end_date') as string;
    const school = formData.get('school') as string;

    const startDateFormated = convertIntoNumericDate(startDate);
    const endDateFormated = convertIntoNumericDate(endDate);

    console.log(
      programName,
      active,
      mentors,
      startDateFormated,
      endDateFormated,
      school,
    );
    console.log(filePic);

    const response = await createProgramAsync({
      active,
      endDate: endDateFormated,
      startDate: startDateFormated,
      mentors,
      name: programName,
      image: 'file1_png',
      type: 'iicp',
      institutionId: school,
    });

    console.log(response);
    setData(defaultDataFormDetail);
    await queryClient.invalidateQueries({ queryKey: ['programs'] });
    router.push('/backoffice/manage-program');
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
