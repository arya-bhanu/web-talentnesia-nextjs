'use client';

import React, { useState, useCallback } from 'react';
import CityView from './City.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCityActions } from './hooks/useCityAction';
import { districtAPI } from './api/cityApi';

const City = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { handleAddCity, handleEditCity, handleDeleteCity } = useCityActions();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['city'],
    queryFn: async () => {
      const response = await districtAPI.fetch();
      return response;
    },
  });
  
  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['city'] });
  }, [queryClient]);

  const handleActionButtonRow = useCallback(async (id: string, action: "delete" | "edit", rowData?: any) => {
    if (action === "delete") {
      await handleDeleteCity(id);
      fetchData();
    } else if (action === "edit" && rowData) {
      await handleEditCity(id, rowData);
      fetchData();
    }
  }, [fetchData, handleDeleteCity, handleEditCity]);

  const handleAdd = useCallback(async (name: string) => {
    await handleAddCity(name);
    fetchData();
    setIsPopupOpen(false);
  }, [fetchData, handleAddCity]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <CityView
      data={data}
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      handleActionButtonRow={handleActionButtonRow}
      handleAddCity={handleAdd}
      Filter={Filter}
      setFilter={setFilter}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      fetchData={fetchData}
    />
  );
};

export default City;
