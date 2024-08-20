'use client';

import React, { useState, useCallback } from 'react';
import RoleView from './Role.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRoleActions } from './hooks/useRoleAction';
import { roleAPI } from './api/roleApi';

const Role = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { handleAddRole, handleEditRole, handleDeleteRole } = useRoleActions();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['Role'],
    queryFn: async () => {
      const response = await roleAPI.fetch();
      return response;
    },
  });
  
  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['Role'] });
  }, [queryClient]);

  const handleActionButtonRow = useCallback(async (id: string, action: "delete" | "edit", rowData?: any) => {
    if (action === "delete") {
      await handleDeleteRole(id);
      fetchData();
    } else if (action === "edit" && rowData) {
      await handleEditRole(id, rowData);
      fetchData();
    }
  }, [fetchData, handleDeleteRole, handleEditRole]);

  const handleAdd = useCallback(async (name: string) => {
    await handleAddRole(name);
    fetchData();
    setIsPopupOpen(false);
  }, [fetchData, handleAddRole]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <RoleView
      data={data}
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      handleActionButtonRow={handleActionButtonRow}
      handleAddRole={handleAdd}
      Filter={Filter}
      setFilter={setFilter}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      fetchData={fetchData}
    />
  );
};

export default Role;
