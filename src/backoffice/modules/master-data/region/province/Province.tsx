'use client';

import React, { useState, useCallback } from 'react';
import ProvinceView from './Province.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useProvinceActions } from './hooks/useProvinceAction';
import { provinceAPI } from './api/provinceApi';

const Province = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { handleAddProvince, handleEditProvince, handleDeleteProvince } = useProvinceActions();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['province'],
    queryFn: async () => {
      const response = await provinceAPI.fetch();
      return response;
    },
  });
  
  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['province'] });
  }, [queryClient]);

  const handleActionButtonRow = useCallback(async (id: string, action: "delete" | "edit", rowData?: any) => {
    if (action === "delete") {
      await handleDeleteProvince(id);
      fetchData();
    } else if (action === "edit" && rowData) {
      await handleEditProvince(id, rowData);
      fetchData();
    }
  }, [fetchData, handleDeleteProvince, handleEditProvince]);

  const handleAdd = useCallback(async (name: string) => {
    await handleAddProvince(name);
    fetchData();
    setIsPopupOpen(false);
  }, [fetchData, handleAddProvince]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <ProvinceView
      data={data}
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      handleActionButtonRow={handleActionButtonRow}
      handleAddProvince={handleAdd}
      Filter={Filter}
      setFilter={setFilter}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      fetchData={fetchData}
    />
  );
};

export default Province;
