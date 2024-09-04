import React, { useState, useCallback, useEffect } from 'react';
import IICPView from './IICP.view';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchIICPProgram, deleteIICPProgram } from './api/iicp.api';
import AlertDeleteModal from '@/backoffice/components/alert-delete-modal/AlertDeleteModal';

const IICP = () => {
  const queryClient = useQueryClient();
  const [Filter, setFilter] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [programIdToDelete, setProgramIdToDelete] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['programs'],
    queryFn: fetchIICPProgram,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteIICPProgram,
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
      <IICPView
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

export default IICP;
