'use client';

import React, { useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import ListTableStudentView from './ListTableStudent.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ListTableStudentAPI } from './api/listTableStudentApi';

const ListTableStudent = () => {
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['listTableStudent', id],
    queryFn: async () => {
      if (typeof id === 'string') {
        const response = await ListTableStudentAPI.fetch(id);
        console.log('response', response);
        return response?.data?.items || []; // Extract items from the response
      }
    },
    enabled: !!id,
  });

  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['listTableStudent', id] });
  }, [queryClient, id]);

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

