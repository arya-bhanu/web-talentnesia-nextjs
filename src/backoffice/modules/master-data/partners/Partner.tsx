'use client';

import React, { useState, useCallback } from 'react';
import PartnersView from './Partner.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { usePartnerActions } from './hooks/usePartnerAction';
import { partnerAPI } from './api/partnerApi';

const Partner = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { handleAddPartner, handleEditPartner, handleDeletePartner } = usePartnerActions();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['partner'],
    queryFn: async () => {
      const response = await partnerAPI.fetch();
      return response;
    },
  });
  
  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['partner'] });
  }, [queryClient]);

  const handleActionButtonRow = useCallback(async (id: string, action: "delete" | "edit", rowData?: any) => {
    if (action === "delete") {
      await handleDeletePartner(id);
      fetchData();
    } else if (action === "edit" && rowData) {
      await handleEditPartner(id, rowData);
      fetchData();
    }
  }, [fetchData, handleDeletePartner, handleEditPartner]);

  const handleAdd = useCallback(async (name: string, address: string, logo: string, description: string) => {
    await handleAddPartner(name, address, logo, description);
    fetchData();
    setIsPopupOpen(false);
  }, [fetchData, handleAddPartner]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <PartnersView
      data={data}
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      handleActionButtonRow={handleActionButtonRow}
      handleAddPartners={handleAdd}
      Filter={Filter}
      setFilter={setFilter}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      fetchData={fetchData}
    />
  );
};

export default Partner;
