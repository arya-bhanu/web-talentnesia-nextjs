'use client';

import React, { useState, useCallback, useEffect } from 'react';
import ReligionView from './Religion.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { religionAPI } from './api/religionApi';
import { useReligionActions } from './hooks/useReligionAction';
import { decodeToken } from '@/lib/tokenDecoder';

const Religion = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userRole, setUserRole] = useState<number>(NaN);

  const { handleAddReligion, handleEditReligion, handleDeleteReligion } = useReligionActions();

  useEffect(() => {
    const decodedToken = decodeToken();
    if (decodedToken) {
      setUserRole(decodedToken.role);
    }
  }, []);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['religion'],
    queryFn: async () => {
      const response = await religionAPI.fetch();
      return response.data.items;
    },
  });

  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['religion'] });
  }, [queryClient]);

  const handleActionButtonRow = useCallback(async (id: string, action: "delete" | "edit", rowData?: string) => {
    if (action === "delete") {
      await handleDeleteReligion(id);
      fetchData();
    } else if (action === "edit" && rowData) {
      await handleEditReligion(id, { name: rowData });
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
      role={userRole}
      data={data || []}
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
