'use client';

import React, { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import ListTableStudentView from './ListTableStudent.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ListTableStudentAPI } from './api/listTableStudentApi';

const ListTableStudent = () => {
  const queryClient = useQueryClient();
  const params = useSearchParams();
  const schoolId = params.get('schoolId')!;

  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['listTableStudent', schoolId],
    queryFn: async () => {
      if (typeof schoolId === 'string') {
        const response = await ListTableStudentAPI.fetch(schoolId);
        return response?.data?.items || []; // Extract items from the response
      }
    },
    enabled: !!schoolId,
  });

  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['listTableStudent', schoolId] });
  }, [queryClient, schoolId]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <ListTableStudentView
      data={data}
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      Filter={Filter}
      setFilter={setFilter}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      fetchData={fetchData}
    />
  );
};

export default ListTableStudent;
