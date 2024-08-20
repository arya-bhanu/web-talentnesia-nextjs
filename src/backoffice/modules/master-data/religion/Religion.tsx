'use client';

import React, { useState, useCallback } from 'react';
import ReligionView from './Religion.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useReligionActions } from './hooks/useReligionAction';
import { religionAPI } from './api/religionApi';

const Religion = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { handleAddReligion, handleEditReligion, handleDeleteReligion } = useReligionActions();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['religion'],
    queryFn: async () => {
      const response = await religionAPI.fetch();
      return response;
    },
  });
  
  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['religion'] });
  }, [queryClient]);

  const handleActionButtonRow = useCallback(async (id: string, action: "delete" | "edit", rowData?: any) => {
    if (action === "delete") {
      await handleDeleteReligion(id);
      fetchData();
    } else if (action === "edit" && rowData) {
      await handleEditReligion(id, rowData);
      fetchData();
    }
  }, [fetchData, handleDeleteReligion, handleEditReligion]);

  const handleAdd = useCallback(async (name: string) => {
    await handleAddReligion(name);
    fetchData();
    setIsPopupOpen(false);
  }, [fetchData, handleAddReligion]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <ReligionView
      data={data}
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      handleActionButtonRow={handleActionButtonRow}
      handleAddReligion={handleAdd}
      Filter={Filter}
      setFilter={setFilter}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      fetchData={fetchData}
    />
  );
};

export default Religion;
