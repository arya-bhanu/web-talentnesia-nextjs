import React, { useState, useCallback, useEffect } from 'react';
import CourseView from './Course.view';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCourseProgram, deleteCourseProgram } from './api/course.api';
import AlertDeleteModal from '@/backoffice/components/alert-delete-modal/AlertDeleteModal';

const Course = () => {
  const queryClient = useQueryClient();
  const [Filter, setFilter] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [programIdToDelete, setProgramIdToDelete] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['programs'],
    queryFn: fetchCourseProgram,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCourseProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      setOpenModal(false);
      setProgramIdToDelete(null);
    },
  });

  const handleActionButtonRow = useCallback((id: string, action: "delete") => {
    if (action === "delete") {
      setProgramIdToDelete(id);
      setOpenModal(true);
    }
  }, []);

  const handleConfirmDelete = () => {
    if (programIdToDelete) {
      deleteMutation.mutate(programIdToDelete);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <CourseView
        data={data?.data?.data?.items || []}
        Filter={Filter}
        setFilter={setFilter}
        handleActionButtonRow={handleActionButtonRow}
      />
      <AlertDeleteModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setIsConfirmed={handleConfirmDelete}
      />
    </>
  );
};

export default Course;
