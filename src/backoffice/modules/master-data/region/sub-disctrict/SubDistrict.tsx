'use client';

import React, { useState, useCallback } from 'react';
import SubDistrictView from './SubDistrict.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSubDistrictActions } from './hooks/useSubDistrictAction';
import { subDistrictAPI } from './api/subDistrictApi';

const SubDistrict = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { handleAddSubDistrict, handleEditSubDistrict, handleDeleteSubDistrict } = useSubDistrictActions();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['subDistrict'],
    queryFn: async () => {
      const response = await subDistrictAPI.fetch();
      return response;
    },
  });
  
  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['subDistrict'] });
  }, [queryClient]);

  const handleActionButtonRow = useCallback(async (id: string, action: "delete" | "edit", rowData?: any) => {
    if (action === "delete") {
      await handleDeleteSubDistrict(id);
      fetchData();
    } else if (action === "edit" && rowData) {
      await handleEditSubDistrict(id, rowData);
      fetchData();
    }
  }, [fetchData, handleDeleteSubDistrict, handleEditSubDistrict]);

  const handleAdd = useCallback(async (name: string) => {
    await handleAddSubDistrict(name);
    fetchData();
    setIsPopupOpen(false);
  }, [fetchData, handleAddSubDistrict]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <SubDistrictView
      data={data}
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      handleActionButtonRow={handleActionButtonRow}
      handleAddSubDistrict={handleAdd}
      Filter={Filter}
      setFilter={setFilter}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      fetchData={fetchData}
    />
  );
};

export default SubDistrict;
