'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import FormProgramView from './FormProgram.view';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchSchoolStudents } from './api/formProgram.api';
import { useTableStudentStore } from './components/table-students/tableStudents.store';

const FormProgram = () => {
  const params = useSearchParams();
  const programId = params.get('programId');
  const schoolId = params.get('schoolId');

  const { setDataSchoolStudents } = useTableStudentStore();

  const [mentors, setMentors] = useState(['Mentor 1', 'Mentor 2']);
  const [status, setStatus] = useState('On Going');
  const [selectedStudents, setSelectedStudents] = useState(['']);
  const [activeAccordion, setActiveAccordion] = useState(-1);
  const [openModalBrowser, setOpenModalBrowser] = useState(false);
  const [openModalModul, setOpenModalModul] = useState(false);

  const { data: schoolStudents, isLoading: isLoadingSchoolStudents } = useQuery(
    {
      queryKey: ['students', programId, schoolId, openModalBrowser],
      queryFn: () => fetchSchoolStudents({ programId, schoolId }),
    },
  );

  useEffect(() => {
    if (schoolStudents?.data?.data?.items) {
      setDataSchoolStudents(schoolStudents?.data?.data?.items);
    }
  }, [JSON.stringify(schoolStudents?.data?.data)]);

  const handleSubmitSelectedModul = (e: FormEvent<HTMLFormElement>) => {};

  return (
    <FormProgramView
      programId={programId}
      handleSubmitSelectedModul={handleSubmitSelectedModul}
      mentors={mentors}
      setMentors={setMentors}
      setStatus={setStatus}
      status={status}
      selected={selectedStudents}
      setSelected={setSelectedStudents}
      open={openModalBrowser}
      setOpen={setOpenModalBrowser}
      activeAccordion={activeAccordion}
      setActiveAccordion={setActiveAccordion}
      openModalModul={openModalModul}
      setOpenModalModul={setOpenModalModul}
    />
  );
};

export default FormProgram;
