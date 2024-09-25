'use client';

import React, { useState, useCallback, useEffect } from 'react';
import ProvinceView from './Province.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { provinceAPI } from './api/provinceApi';
import { useProvinceActions } from './hooks/useProvinceAction';
import { decodeToken } from '@/lib/tokenDecoder';

const Province = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userRole, setUserRole] = useState<number>(NaN);

  const { handleAddProvince, handleEditProvince, handleDeleteProvince } = useProvinceActions();

  useEffect(() => {
    const decodedToken = decodeToken();
    if (decodedToken) {
      setUserRole(decodedToken.role);
    }
  }, []);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['province'],
    queryFn: async () => {
      const response = await provinceAPI.fetch();
      return response.data.items;
    },
  });

  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['province'] });
  }, [queryClient]);

  const handleActionButtonRow = useCallback(async (id: string, action: "delete" | "edit", rowData?: string) => {
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
      role={userRole}
      data={data || []}
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
