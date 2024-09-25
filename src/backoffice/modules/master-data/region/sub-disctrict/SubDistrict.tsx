'use client';

import React, { useState, useCallback, useEffect } from 'react';
import SubDistrictView from './SubDistrict.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { subDistrictAPI } from './api/subDistrictApi';
import { useSubDistrictActions } from './hooks/useSubDistrictAction';
import { decodeToken } from '@/lib/tokenDecoder';

const SubDistrict = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userRole, setUserRole] = useState<number>(NaN);

  const { handleAddSubDistrict, handleEditSubDistrict, handleDeleteSubDistrict } = useSubDistrictActions();

  useEffect(() => {
    const decodedToken = decodeToken();
    if (decodedToken) {
      setUserRole(decodedToken.role);
    }
  }, []);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['subDistrict'],
    queryFn: async () => {
      const response = await subDistrictAPI.fetch();
      return response.data.items;
    },
  });

  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['subDistrict'] });
  }, [queryClient]);

  const handleActionButtonRow = useCallback(async (id: string, action: "delete" | "edit", rowData?: string) => {
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
      role={userRole}
      data={data || []}
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
