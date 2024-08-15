'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import EditableListContentView from './EditableListContent.view';
import { IEditableListContent } from './editableListContent.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteContent } from '../../modules/manage-modul/api/manageModelApi';

const EditableListContent: React.FC<IEditableListContent> = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [isConfirmDel, setIsConfirmDel] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const queryClient = useQueryClient();

  const { mutateAsync: deleteContentAsync } = useMutation({
    mutationFn: deleteContent,
    mutationKey: ['content'],
  });

  useEffect(() => {
    (async function () {
      if (isConfirmDel) {
        await deleteContentAsync(props.id);
        await queryClient.invalidateQueries({ queryKey: ['chapter'] });
        await queryClient.invalidateQueries({ queryKey: ['content'] });
        await queryClient.invalidateQueries({ queryKey: ['modules'] });
      }
    })();
  }, [isConfirmDel]);

  const handleEditContent = (e: FormEvent<HTMLFormElement>) => {};
  return (
    <EditableListContentView
      handleSubmitEdit={handleEditContent}
      openModalEdit={openModalEdit}
      setOpenModalEdit={setOpenModalEdit}
      {...props}
      isConfirmed={isConfirmDel}
      openModal={openModal}
      setIsConfirmed={setIsConfirmDel}
      setOpenModal={setOpenModal}
    />
  );
};

export default EditableListContent;
