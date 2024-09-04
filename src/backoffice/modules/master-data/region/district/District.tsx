'use client';

import React, { useState, useCallback, useEffect } from 'react';
import DistrictView from './District.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { districtAPI } from './api/districtApi';
import { useDistrictActions } from './hooks/useDistrictAction';
import { decodeToken } from '@/lib/tokenDecoder';

const District = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userRole, setUserRole] = useState<number>(NaN);

  const { handleAddDistrict, handleEditDistrict, handleDeleteDistrict } = useDistrictActions();

  useEffect(() => {
    const decodedToken = decodeToken();
    if (decodedToken) {
      setUserRole(decodedToken.role);
    }
  }, []);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['district'],
    queryFn: async () => {
      const response = await districtAPI.fetch();
      return response.data.items;
    },
  });

  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['district'] });
  }, [queryClient]);

  const handleActionButtonRow = useCallback(async (id: string, action: "delete" | "edit", rowData?: any) => {
    if (action === "delete") {
      await handleDeleteDistrict(id);
      fetchData();
    } else if (action === "edit" && rowData) {
      await handleEditDistrict(id, rowData);
      fetchData();
    }
  }, [fetchData, handleDeleteDistrict, handleEditDistrict]);

  const handleAdd = useCallback(async (name: string) => {
    await handleAddDistrict(name);
    fetchData();
    setIsPopupOpen(false);
  }, [fetchData, handleAddDistrict]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <DistrictView
      role={userRole}
      data={data || []}
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      handleActionButtonRow={handleActionButtonRow}
      handleAddDistrict={handleAdd}
      Filter={Filter}
      setFilter={setFilter}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      fetchData={fetchData}
    />
  );
};

export default District;
