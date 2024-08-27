'use client';

import React, { useState, useCallback } from 'react';
import CategoryView from './Category.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCategoryActions } from './hooks/useCategoryAction';
import { categoryAPI } from './api/categoryApi';

const Category = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { handleAddCategory, handleEditCategory, handleDeleteCategory } = useCategoryActions();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['Category'],
    queryFn: async () => {
      const response = await categoryAPI.fetch();
      return response;
    },
  });
  
  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['Category'] });
  }, [queryClient]);

  const handleActionButtonRow = useCallback(async (id: string, action: "delete" | "edit", rowData?: any) => {
    if (action === "delete") {
      await handleDeleteCategory(id); 
      fetchData();
    } else if (action === "edit" && rowData) {
      await handleEditCategory(id, rowData); 
      fetchData();
    }
  }, [fetchData, handleDeleteCategory, handleEditCategory]);

  const handleAdd = useCallback(async (name: string) => {
    await handleAddCategory(name);
    fetchData();
    setIsPopupOpen(false);
  }, [fetchData, handleAddCategory]);
  

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <CategoryView
      data={data}
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      handleActionButtonRow={handleActionButtonRow}
      handleAddCategory={handleAdd}
      Filter={Filter}
      setFilter={setFilter}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      fetchData={fetchData}
    />
  );
};

export default Category;
