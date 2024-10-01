'use client';

import React, { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import ListTableStudentView from './ListTableStudent.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ListTableStudentAPI } from './api/listTableStudentApi';
import Loading from '@/components/loading';

const ListTableStudent = () => {
  const queryClient = useQueryClient();
  const params = useSearchParams();
  const schoolId = params.get('schoolId')!;

  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['listTableStudent', schoolId],
    queryFn: async () => {
      if (typeof schoolId === 'string') {
        const response = await ListTableStudentAPI.fetch(schoolId);
        return response?.data?.items || [];
      }
    },
    enabled: !!schoolId,
  });

  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: ['listTableStudent', schoolId],
    });
  }, [queryClient, schoolId]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Loading isLoading={isLoading}>
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
    </Loading>
  );
};

export default ListTableStudent;
