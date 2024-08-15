'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import EditableListContentView from './EditableListContent.view';
import { IEditableListContent } from './editableListContent.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteContent,
  editContent,
} from '../../modules/manage-modul/api/manageModelApi';

const EditableListContent: React.FC<IEditableListContent> = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [isConfirmDel, setIsConfirmDel] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const queryClient = useQueryClient();

  const { mutateAsync: deleteContentAsync } = useMutation({
    mutationFn: deleteContent,
    mutationKey: ['content'],
  });

  const { mutateAsync: editContentAsync } = useMutation({
    mutationFn: editContent,
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

  const handleEditContent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget);
    const time = formData.get('time') as string;
    const title = formData.get('title') as string;
    const type = formData.get('type') as string;
    const uploadFile = formData.get('upload_file') as File;
    const convertedTime = time.substring(0, 5);

    if (props.id) {
      await editContentAsync({
        id: props.id,
        data: { duration: convertedTime, title, type, body: 'test_1' },
      });
      await queryClient.invalidateQueries({ queryKey: ['chapter'] });
      await queryClient.invalidateQueries({ queryKey: ['content'] });
      await queryClient.invalidateQueries({ queryKey: ['modules'] });
      setOpenModalEdit(false);
    }
  };

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
