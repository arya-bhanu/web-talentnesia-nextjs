'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import FormDetailView from './FormDetail.view';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFormDetailStore } from './formDetail.store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createProgram,
  fetchDetailProgram,
  fetchMentors,
  fetchSchools,
} from './api/formDetail.api';
import { Mentor } from '@/backoffice/components/mentor-selector/mentorSelector.type';
import { APIDetailProgram, Schools } from './formDetail.type';
import { convertIntoNumericDate } from '@/helpers/formatter.helper';
import { defaultDataFormDetail, defaultDataFormDetailEdit } from './formDetail.data';
import { getImageUrl } from '@/backoffice/modules/school/api/minioApi';
import { useTabStoreManageProgram } from '../../../manageProgramStore';
import Loading from '@/components/loading';

const FormDetail = () => {
  const params = useSearchParams();
  const queryClient = useQueryClient();
  const programId = params.get('programId');
  const router = useRouter();
  const {
    data,
    setData,
    setDefaultMentors,
    setDefaultSchools,
    setDefaultData,
    resetStore,
  } = useFormDetailStore();
  const [fullImageUrl, setFullImageUrl] = useState<string>('');
  const { activeTab } = useTabStoreManageProgram();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState<string>('');

  const { data: dataProgramDetail, isLoading: isLoadingProgramDetail } =
    useQuery({
      queryKey: ['program', 'detail', programId],
      queryFn: () => fetchDetailProgram(programId),
    });

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
      const isDataLoaded = !isLoadingProgramDetail && !isLoadingMentors && !isLoadingSchools;
      if (isDataLoaded) {
        setIsLoading(false);
      }
    }, [isLoadingProgramDetail, isLoadingMentors, isLoadingSchools]);

    useEffect(() => {
      if (!programId) {
        resetStore();
      }
    }, [programId]);

    useEffect(() => {
      if (programId && dataProgramDetail?.data?.data) {
        setDefaultData(dataProgramDetail.data.data);
        setSelectedSchool(dataProgramDetail.data.data.institutionId || '');
        if (dataProgramDetail.data.data.image) {
          getImageUrl(dataProgramDetail.data.data.image)
            .then(setFullImageUrl)
            .catch(console.error);
        }
      } else {
        setDefaultData(defaultDataFormDetailEdit);
        setFullImageUrl('');
        setSelectedSchool('');
      }
    if (dataMentors?.data?.data) {
      setDefaultMentors(
        dataMentors.data.data.map((el: Mentor) => {
          return {
            id: el.id,
            name: el.name,
          } as Mentor;
        }),
      );
    }
    if (dataSchools?.data?.data) {
      setDefaultSchools(
        dataSchools.data.data.map((el: Schools) => {
          return {
            id: el.id,
            name: el.name,
          } as Schools;
        }),
      );
    }
  }, [
    JSON.stringify(dataMentors?.data),
    JSON.stringify(dataSchools?.data),
    JSON.stringify(dataProgramDetail?.data),
  ]);

  const handleFileChange = async (fileUrl: string) => {
    const fullUrl = await getImageUrl(fileUrl);
    setData((prevData: APIDetailProgram) => ({ ...prevData, image: fileUrl }));
    setFullImageUrl(fullUrl);
  };

  const handleSubmitFormDetail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget);
    const programName = formData.get('program_name') as string;
    const active = Number(formData.get('active') as string) as 0 | 1;
    const mentors = data.mentors.map((el: Mentor) => el.id);
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
      image: filePic,
      type: activeTab,
      institutionId: school,
    });

    console.log(response);
    setData(defaultDataFormDetail);
    await queryClient.invalidateQueries({ queryKey: ['programs'] });
    router.push('/backoffice/manage-program');
  };
  return (
    <Loading isLoading={isLoading}>
      <FormDetailView
        programId={programId || undefined}
        handleSubmitForm={handleSubmitFormDetail}
        isLoadingMentors={isLoadingMentors}
        handleFileChange={handleFileChange}
        fullImageUrl={fullImageUrl}
        programType={dataProgramDetail?.data?.data?.type}
        selectedSchool={selectedSchool}
        setSelectedSchool={setSelectedSchool}
      />
    </Loading>
  );
};

export default FormDetail;
