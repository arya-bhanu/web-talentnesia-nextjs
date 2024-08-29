'use client';
import React, { useEffect } from 'react';
import TableStudentsView from './TableStudents.view';
import { ITableStudents } from './tableStudents.type';
import { useQuery } from '@tanstack/react-query';
import { fetchStudentsJoined } from './api/tableStudents.api';
import { useSearchParams } from 'next/navigation';
import { useTableStudentStore } from './tableStudents.store';

const TableStudents: React.FC<ITableStudents> = (props) => {
  const programId = useSearchParams().get('programId');
  const { setDataStudentsJoined: setData } = useTableStudentStore();
  const { data: studentsJoined, isLoading: isLoadingStudentsJoined } = useQuery(
    {
      queryKey: ['students', programId],
      queryFn: () => fetchStudentsJoined(programId),
    },
  );
  useEffect(() => {
    if (studentsJoined?.data?.data?.items) {
      setData(studentsJoined?.data?.data?.items);
    }
  }, [studentsJoined?.data?.data]);

  return <TableStudentsView {...props} />;
};

export default TableStudents;
