'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import EditableListContentView from './EditableListContent.view';
import { IEditableListContent } from './editableListContent.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteContent,
  deleteExam,
  editContent,
} from '../../modules/manage-modul/api/manageModelApi';
import { useStatusModalStore } from '@/lib/store';

const EditableListContent: React.FC<IEditableListContent> = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [isConfirmDel, setIsConfirmDel] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const { openModal: openModalToast } = useStatusModalStore();

  const queryClient = useQueryClient();

  const { mutateAsync: deleteContentAsync } = useMutation({
    mutationFn: deleteContent,
    mutationKey: ['content'],
  });

  const { mutateAsync: deleteExamAsync } = useMutation({
    mutationKey: ['content'],
    mutationFn: deleteExam,
  });

  const { mutateAsync: editContentAsync } = useMutation({
    mutationFn: editContent,
    mutationKey: ['content'],
  });

  useEffect(() => {
    (async function () {
      if (isConfirmDel) {
        await handleDeleteContent(Boolean(props.isexam), props.id);
        await queryClient.invalidateQueries({ queryKey: ['chapter'] });
        await queryClient.invalidateQueries({ queryKey: ['content'] });
        await queryClient.invalidateQueries({ queryKey: ['modules'] });
      }
    })();
  }, [isConfirmDel]);

  const handleDeleteContent = async (isexam: boolean, id: string) => {
    try {
      if (isexam) {
        await deleteContentAsync(id);
        openModalToast({
          status: 'success',
          action: 'delete',
          message: 'data konten berhasil dihapus',
        });
      } else {
        await deleteExamAsync(id);
        openModalToast({
          status: 'success',
          action: 'delete',
          message: 'data exam berhasil dihapus',
        });
      }
    } catch (err) {
      console.error(err);
      openModalToast({
        status: 'error',
        message: JSON.stringify(err),
      });
    }
  };

  const handleEditContent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget);
    const time = formData.get('time') as string;
    const title = formData.get('title') as string;
    const type = formData.get('type') as string;
    const uploadFile = formData.get('upload_file') as File;
    const fileUrl = formData.get('fileUrl') as string;
    const fileName = formData.get('fileName') as string;
    const convertedTime = time.substring(0, 5);

    if (props.id) {
      try {
        await editContentAsync({
          id: props.id,
          data: { duration: convertedTime, title, type, body: fileName },
        });
        await queryClient.invalidateQueries({ queryKey: ['chapter'] });
        await queryClient.invalidateQueries({ queryKey: ['content'] });
        await queryClient.invalidateQueries({ queryKey: ['modules'] });
        openModalToast({
          status: 'success',
          message: 'data konten berhasil diupdate',
          action: 'update',
        });
        setOpenModalEdit(false);
      } catch (err) {
        console.error(err);
        openModalToast({
          status: 'error',
          message: JSON.stringify(err),
        });
      }
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
