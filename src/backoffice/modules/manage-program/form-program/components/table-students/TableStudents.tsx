'use client';
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useTableStudentStore } from './tableStudents.store';
import { fetchStudentsJoined } from './api/tableStudents.api';
import TableStudentsView from './TableStudents.view';
import Loading from '@/components/loading';

interface TableStudentsProps {
  setOpenModalBrowser: (open: boolean) => void;
  className?: string;
}

const TableStudents: React.FC<TableStudentsProps> = ({ setOpenModalBrowser, className }) => {
  const programId = useSearchParams().get('programId');
  const { setDataStudentsJoined } = useTableStudentStore();

  const { data: studentsJoined, isLoading: isLoadingStudentsJoined } = useQuery(
    {
      queryKey: ['students', programId],
      queryFn: () => fetchStudentsJoined(programId),
    },
  );

  useEffect(() => {
    if (studentsJoined?.data?.data?.items) {
      setDataStudentsJoined(studentsJoined.data.data.items);
    }
  }, [studentsJoined?.data?.data, setDataStudentsJoined]);

  return (
    <Loading isLoading={isLoadingStudentsJoined}>
      <TableStudentsView setOpenModalBrowser={setOpenModalBrowser} className={className} />
    </Loading>
  );
};

export default TableStudents;