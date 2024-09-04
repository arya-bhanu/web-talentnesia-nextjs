// In IICP.tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchIICPProgram, deleteIICPProgram } from './api/iicp.api';
import { useIICPStore } from './iicp.store';
import AlertDeleteModal from '@/backoffice/components/alert-delete-modal/AlertDeleteModal';
import { useEffect, useState } from 'react';
import IICPView from './IICP.view';

const IICP = () => {
  const [popoverIndex, setPopoverIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [programIdToDelete, setProgramIdToDelete] = useState<string | null>(null);
  const { setPrograms } = useIICPStore();
  const queryClient = useQueryClient();

  const { data: dataProgramsIICP, isLoading: isLoadingPrograms } = useQuery({
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

  useEffect(() => {
    if (dataProgramsIICP?.data?.data?.items) {
      setPrograms(dataProgramsIICP.data.data.items);
    }
  }, [JSON.stringify(dataProgramsIICP?.data)]);

  const handleDeleteClick = (id: string) => {
    setProgramIdToDelete(id);
    setOpenModal(true);
  };

  const handleConfirmDelete = () => {
    if (programIdToDelete) {
      deleteMutation.mutate(programIdToDelete);
    }
  };

  return (
    <>
      <IICPView 
        popoverIndex={popoverIndex} 
        setPopoverIndex={setPopoverIndex} 
        onDeleteClick={handleDeleteClick}
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
