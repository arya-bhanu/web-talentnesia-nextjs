'use client';
import React, { useState } from 'react';
import FormChapterView from './FormChapter.view';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { createChapter } from '../../api/manageModelApi';
import useCreateQueryParams from '@/hooks/useCreateQueryParams';

const FormChapter = () => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const createQuery = useCreateQueryParams();
  const [actionSubChapter, setActionSubChapter] = useState<'exam' | 'content'>(
    'exam',
  );
  const [openModalAddContent, setOpenModalAddContent] = useState(false);
  const { mutateAsync: createChapterAsync } = useMutation({
    mutationKey: ['chapter'],
    mutationFn: createChapter,
  });
  const handleSubmitAddContent = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {};
  const handleSubmitCreateChapter = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const moduleId = params.get('modulId');
    const formData = new FormData(e.currentTarget);
    const chapter = formData.get('chapter') as string;
    if (moduleId && chapter) {
      const response = await createChapterAsync({ moduleId, title: chapter });
      const chapterId = response.data.id;

      if (actionSubChapter === 'exam') {
        router.push(
          pathname + '/add-exam' + '?' + createQuery('chapterId', chapterId),
        );
      } else {
        router.push(pathname + '?' + createQuery('chapterId', chapterId));
        setOpenModalAddContent(true);
      }
    }
  };

  return (
    <FormChapterView
      setActionSubChapter={setActionSubChapter}
      handleSubmitAddContent={handleSubmitAddContent}
      stateFormAddContent={{
        openModal: openModalAddContent,
        setOpenModal: setOpenModalAddContent,
      }}
      handleSubmitCreateChapter={handleSubmitCreateChapter}
    />
  );
};

export default FormChapter;
