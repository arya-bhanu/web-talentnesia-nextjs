'use client';

import React, { useState, useCallback } from 'react';
import QuizTypeView from './QuizType.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useQuizTypeActions } from './hooks/useQuizTypeAction';
import { quizTypeAPI } from './api/quizTypeApi';
import { APIResponseQuizType } from './quizType.type';

const QuizType = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { handleAddQuizType, handleEditQuizType, handleDeleteQuizType } = useQuizTypeActions();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['quizType'],
    queryFn: async () => {
      const response = await quizTypeAPI.fetch();
      return response;
    },
  });
  
  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['quizType'] });
  }, [queryClient]);

  const handleActionButtonRow = useCallback(async (id: string, action: "delete" | "edit", rowData?: string) => {
    if (action === "delete") {
      await handleDeleteQuizType(id);
      fetchData();
    } else if (action === "edit" && rowData) {
      await handleEditQuizType(id, rowData as unknown as APIResponseQuizType);
      fetchData();
    }
  }, [fetchData, handleDeleteQuizType, handleEditQuizType]);

  const handleAdd = useCallback(async (name: string) => {
    await handleAddQuizType(name);
    fetchData();
    setIsPopupOpen(false);
  }, [fetchData, handleAddQuizType]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <QuizTypeView
      data={data}
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      handleActionButtonRow={handleActionButtonRow}
      handleAddQuizType={handleAdd}
      Filter={Filter}
      setFilter={setFilter}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      fetchData={fetchData}
    />
  );
};
export default QuizType;
