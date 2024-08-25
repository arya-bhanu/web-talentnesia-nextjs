'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import FormProgramView from './FormProgram.view';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchSchoolStudents } from './api/formProgram.api';
import { useTableStudentStore } from './components/table-students/tableStudents.store';

const columns = [
  {
    key: 'no',
    val: 'No',
  },
  {
    key: 'name',
    val: 'Name',
  },
  {
    key: 'email',
    val: 'Email',
  },
  {
    key: 'noHp',
    val: 'No. Hp',
  },
];

const rows = [
  {
    name: () => (
      <div className="flex items-center gap-1.5">
        <Image
          alt="prof-pic"
          src={'/images/manage-program/profile.svg'}
          width={50}
          height={50}
          className="rounded-full w-9 h-9"
        />
        <span>Cintia</span>
      </div>
    ),
    email: 'cintia@gmail.com',
    noHp: '081876564328',
    id: 1,
  },
  {
    name: () => (
      <div className="flex items-center gap-1.5">
        <Image
          alt="prof-pic"
          src={'/images/manage-program/profile.svg'}
          width={50}
          height={50}
          className="rounded-full w-9 h-9"
        />
        <span className="w-max">Roby</span>
      </div>
    ),
    email: 'roby@gmail.com',
    noHp: '081876564328',
    id: 2,
  },
  {
    name: () => (
      <div className="flex items-center gap-1.5">
        <Image
          alt="prof-pic"
          src={'/images/manage-program/profile.svg'}
          width={50}
          height={50}
          className="rounded-full w-9 h-9"
        />
        <span className="w-max">Jennifer</span>
      </div>
    ),
    email: 'jennifer@gmail.com',
    noHp: '081876564328',
    id: 3,
  },
];

const mappedNumberRows = rows.map((el, index) => {
  return { ...el, no: index + 1 };
});

const FormProgram = () => {
  const params = useSearchParams();
  const programId = params.get('programId');
  const schoolId = params.get('schoolId');

  const { setDataSchoolStudents } = useTableStudentStore();

  const [mentors, setMentors] = useState(['Mentor 1', 'Mentor 2']);
  const [status, setStatus] = useState('On Going');
  const [selectedStudents, setSelectedStudents] = useState(['']);
  const [activeAccordion, setActiveAccordion] = useState(-1);
  const [openModalBrowse, setOpenModalBrowse] = useState(false);
  const [openModalModul, setOpenModalModul] = useState(false);

  const { data: schoolStudents, isLoading: isLoadingSchoolStudents } = useQuery(
    {
      queryKey: ['students', programId, schoolId, openModalBrowse],
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
      open={openModalBrowse}
      setOpen={setOpenModalBrowse}
      columns={columns}
      rows={mappedNumberRows}
      activeAccordion={activeAccordion}
      setActiveAccordion={setActiveAccordion}
      openModalModul={openModalModul}
      setOpenModalModul={setOpenModalModul}
    />
  );
};

export default FormProgram;
