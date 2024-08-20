'use client';

import React, { useState, useCallback } from 'react';
import CertificateView from './Certificate.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCertificateActions } from './hooks/useCertificateAction';
import { certificateAPI } from './api/certificateApi';

const Certificate = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { handleAddCertificate, handleEditCertificate, handleDeleteCertificate } = useCertificateActions();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['certificate'],
    queryFn: async () => {
      const response = await certificateAPI.fetch();
      return response;
    },
  });
  
  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['certificate'] });
  }, [queryClient]);

  const handleActionButtonRow = useCallback(async (id: string, action: "delete" | "edit", rowData?: any) => {
    if (action === "delete") {
      await handleDeleteCertificate(id);
      fetchData();
    } else if (action === "edit" && rowData) {
      await handleEditCertificate(id, rowData);
      fetchData();
    }
  }, [fetchData, handleDeleteCertificate, handleEditCertificate]);

  const handleAdd = useCallback(async (name: string) => {
    await handleAddCertificate(name);
    fetchData();
    setIsPopupOpen(false);
  }, [fetchData, handleAddCertificate]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <CertificateView
      data={data}
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      handleActionButtonRow={handleActionButtonRow}
      handleAddCertificate={handleAdd}
      Filter={Filter}
      setFilter={setFilter}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      fetchData={fetchData}
    />
  );
};

export default Certificate;
