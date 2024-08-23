'use client';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSchools, deleteSchool } from './api/schoolApi';
import ManageModulView from './School.view';

const ManageModul = () => {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ['schools'], queryFn: fetchSchools });
  const { mutateAsync: deleteSchoolAsync } = useMutation({
    mutationFn: deleteSchool,
  });
  const [openPopoverIndex, setOpenPopoverIndex] = useState(-1);

  const handleActionButtonRow = async (
    id: string,
    action: 'delete' | 'edit',
  ) => {
    switch (action) {
      case 'delete':
        await deleteSchoolAsync(id);
        break;
      default:
        break;
    }
    queryClient.invalidateQueries({ queryKey: ['schools'] });
  };

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  const data = query.data?.data?.items;

  if (!data || data.length === 0) {
    return <div>No schools available.</div>;
  }

  return (
    <ManageModulView
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      data={data}
      handleActionButtonRow={handleActionButtonRow}
    />
  );
};

export default ManageModul;
