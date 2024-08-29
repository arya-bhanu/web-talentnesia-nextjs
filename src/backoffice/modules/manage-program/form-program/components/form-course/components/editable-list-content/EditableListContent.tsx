'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import EditableListContentView from './EditableListContent.view';
import { IEditableListContent } from './editableListContent.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteContent,
  editContent,
  deleteExam,
} from '../../api/formCourse.api';

const EditableListContent: React.FC<IEditableListContent> = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [isConfirmDel, setIsConfirmDel] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

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
      isexam ? await deleteContentAsync(id) : await deleteExamAsync(id);
    } catch (err) {
      console.error(err);
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
    const convertedTime = time.substring(0, 5);

    if (props.id) {
      await editContentAsync({
        contentId: props.id,
        payload: {
          duration: convertedTime,
          title,
          type,
          body: 'test_1',
          isexam: 0,
          chapterId: props.chapterId,
          id: props.id,
          order: props.order,
        },
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
