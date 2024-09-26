'use client';

import React, { useState, useCallback } from 'react';
import ZipCodeView from './ZipCode.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useZipCodeActions } from './hooks/useZipCodeAction';
import { zipCodeAPI } from './api/zipCodeApi';
import { APIResponseZipCode } from './zipCode.type';

const ZipCode = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { handleAddZipCode, handleEditZipCode, handleDeleteZipCode } = useZipCodeActions();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['ZipCode'],
    queryFn: async () => {
      const response = await zipCodeAPI.fetch();
      return response;
    },
  });
  
  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['ZipCode'] });
  }, [queryClient]);

  const handleActionButtonRow = useCallback(async (id: string, action: "delete" | "edit", rowData?: APIResponseZipCode) => {
    if (action === "delete") {
      await handleDeleteZipCode(id);
      fetchData();
    } else if (action === "edit" && rowData) {
      await handleEditZipCode(id, rowData);
      fetchData();
    }
  }, [fetchData, handleDeleteZipCode, handleEditZipCode]);

  const handleAdd = useCallback(async (name: string) => {
    await handleAddZipCode(name);
    fetchData();
    setIsPopupOpen(false);
  }, [fetchData, handleAddZipCode]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <ZipCodeView
      data={data}
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
          handleActionButtonRow={(id: string, action: "delete" | "edit", rowData?: string | undefined) => {
            if (action === "edit" && rowData) {
              const parsedRowData: APIResponseZipCode = JSON.parse(rowData);
              handleActionButtonRow(id, action, parsedRowData);
            } else {
              handleActionButtonRow(id, action);
            }
          }}
          handleAddZipCode={handleAdd}
          Filter={Filter}
          setFilter={setFilter}
          isPopupOpen={isPopupOpen}
          setIsPopupOpen={setIsPopupOpen}
          fetchData={fetchData}
        />
      );
};

export default ZipCode;
