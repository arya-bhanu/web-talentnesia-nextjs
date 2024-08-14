'use client';
import React, { useState } from 'react';
import FormChapterView from './FormChapter.view';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createChapter,
  createContent,
  fetchChapter,
} from '../../api/manageModelApi';
import useCreateQueryParams from '@/hooks/useCreateQueryParams';

const FormChapter = () => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const createQuery = useCreateQueryParams();
  const [actionSubChapter, setActionSubChapter] = useState<'exam' | 'content'>(
    'exam',
  );
  const [openModalAddContent, setOpenModalAddContent] = useState(false);
  const { mutateAsync: createChapterAsync } = useMutation({
    mutationKey: ['chapter'],
    mutationFn: createChapter,
  });
  const { mutateAsync: createContentAsync } = useMutation({
    mutationKey: ['content', 'chapter'],
    mutationFn: createContent,
  });
  const { data: dataChapter, isLoading: isLoadingChapter } = useQuery({
    queryKey: ['chapter'],
    queryFn: () => fetchChapter(params.get('chapterId')),
  });
  const handleSubmitAddContent = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const time = formData.get('time') as string;
      const title = formData.get('title') as string;
      const type = formData.get('type') as string;
      const uploadFile = formData.get('upload_file') as File;
      const convertedTime = time.substring(0, 5);
      const chapterId = params.get('chapterId');
      if (chapterId && convertedTime && title && type && uploadFile) {
        await createContentAsync({
          body: 'sample',
          duration: convertedTime,
          title,
          type,
          chapterId,
          isexam: 0,
        });
        await queryClient.invalidateQueries({ queryKey: ['chapter'] });
        setOpenModalAddContent(false);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleSubmitCreateChapter = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    console.log('add chapter');
    try {
      e.preventDefault();
      const moduleId = params.get('modulId');
      const formData = new FormData(e.currentTarget);
      const chapter = formData.get('chapter') as string;
      // current chapterId
      const chapterId = params.get('chapterId');
      if (moduleId && chapter && !chapterId) {
        const response = await createChapterAsync({ moduleId, title: chapter });
        // get chapterId from  created chapter
        const chapterId = response.data.id;

        if (actionSubChapter === 'exam') {
          router.replace(
            pathname + '/add-exam' + '?' + createQuery('chapterId', chapterId),
          );
        } else {
          router.push(pathname + '?' + createQuery('chapterId', chapterId));
          setOpenModalAddContent(true);
        }
      } else if (moduleId && chapterId) {
        if (actionSubChapter === 'exam') {
          router.push(
            pathname + '/add-exam' + '?' + createQuery('chapterId', chapterId),
          );
        } else {
          setOpenModalAddContent(true);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormChapterView
      defaultValueData={dataChapter?.data}
      setActionSubChapter={setActionSubChapter}
      handleSubmitAddContent={handleSubmitAddContent}
      stateFormAddContent={{
        openModal: openModalAddContent,
        setOpenModal: setOpenModalAddContent,
      }}
      handleSubmitCreateChapter={handleSubmitCreateChapter}
      contents={{
        data: dataChapter?.data?.contents,
        isLoading: isLoadingChapter,
      }}
    />
  );
};

export default FormChapter;
