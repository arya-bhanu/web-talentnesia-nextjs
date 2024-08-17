'use client';

import React, { useState, useCallback } from 'react';
import LevelView from './Level.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLevelActions } from './hooks/useLevelAction';
import { levelAPI } from './api/levelApi';

const Level = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { handleAddLevel, handleEditLevel, handleDeleteLevel } = useLevelActions();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['level'],
    queryFn: async () => {
      const response = await levelAPI.fetch();
      return response;
    },
  });
  
  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['level'] });
  }, [queryClient]);

  const handleActionButtonRow = useCallback(async (id: string, action: "delete" | "edit", rowData?: any) => {
    if (action === "delete") {
      await handleDeleteLevel(id);
      fetchData();
    } else if (action === "edit" && rowData) {
      await handleEditLevel(id, rowData);
      fetchData();
    }
  }, [fetchData, handleDeleteLevel, handleEditLevel]);

  const handleAdd = useCallback(async (name: string) => {
    await handleAddLevel(name);
    fetchData();
    setIsPopupOpen(false);
  }, [fetchData, handleAddLevel]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <LevelView
      data={data}
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      handleActionButtonRow={handleActionButtonRow}
      handleAddLevel={handleAdd}
      Filter={Filter}
      setFilter={setFilter}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      fetchData={fetchData}
    />
  );
};

export default Level;
