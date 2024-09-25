'use client';

import React, { useState, useCallback } from 'react';
import DiscountView from './Discount.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDiscountActions } from './hooks/useDiscountAction';
import { discountAPI } from './api/discountApi';

const Discount = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { handleAddDiscount, handleEditDiscount, handleDeleteDiscount } = useDiscountActions();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['Discount'],
    queryFn: async () => {
      const response = await discountAPI.fetch();
      return response;
    },
  });
  
  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['Discount'] });
  }, [queryClient]);

  const handleActionButtonRow = useCallback(async (id: string, action: "delete" | "edit", rowData?: string) => {
    if (action === "delete") {
      await handleDeleteDiscount(id);
      fetchData();
    } else if (action === "edit" && rowData) {
      await handleEditDiscount(id, rowData);
      fetchData();
    }
  }, [fetchData, handleDeleteDiscount, handleEditDiscount]);

  const handleAdd = useCallback(async (name: string) => {
    await handleAddDiscount(name);
    fetchData();
    setIsPopupOpen(false);
  }, [fetchData, handleAddDiscount]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <DiscountView
      data={data || []}
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      handleActionButtonRow={handleActionButtonRow}
      handleAddDiscount={handleAdd}
      Filter={Filter}
      setFilter={setFilter}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      fetchData={fetchData}
    />
  );
};

export default Discount;
