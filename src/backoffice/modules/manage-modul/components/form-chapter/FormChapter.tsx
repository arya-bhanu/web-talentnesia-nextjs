'use client';
import React, { useEffect, useState } from 'react';
import FormChapterView from './FormChapter.view';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createChapter,
  createContent,
  editChapter,
  fetchChapter,
} from '../../api/manageModelApi';
import useCreateQueryParams from '@/hooks/useCreateQueryParams';
import { ISubmitType } from './formChapter.type';
import { useStatusModalStore } from '@/lib/store';
import AlertModal from '@/backoffice/components/alert-modal';

const FormChapter = () => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { openModal } = useStatusModalStore();

  const createQuery = useCreateQueryParams();
  const [actionSubChapter, setActionSubChapter] = useState<'exam' | 'content'>(
    'exam',
  );
  const [submitType, setSubmitType] = useState<ISubmitType>({
    type: 'nextSubmit',
  });
  const [openModalAddContent, setOpenModalAddContent] = useState(false);
  const [openAlertModalChapter, setOpenAlertModalChapter] = useState(false);
  const [openAlertModalContent, setOpenAlertModalContent] = useState(false);
  const [isConfirmedChapter, setIsConfirmedChapter] = useState(false);
  const [isConfirmedContent, setIsConfirmedContent] = useState(false);
  const [tempChapterFormData, setTempChapterFormData] =
    useState<FormData | null>(null);
  const [tempContentFormData, setTempContentFormData] =
    useState<FormData | null>(null);

  const { mutateAsync: createChapterAsync } = useMutation({
    mutationKey: ['chapter'],
    mutationFn: createChapter,
  });
  const { mutateAsync: editChapterAsync } = useMutation({
    mutationKey: ['chapter'],
    mutationFn: editChapter,
  });
  const { mutateAsync: createContentAsync } = useMutation({
    mutationKey: ['content', 'chapter'],
    mutationFn: createContent,
  });
  const { data: dataChapter, isLoading: isLoadingChapter } = useQuery({
    queryKey: ['chapter'],
    queryFn: () => fetchChapter(params.get('chapterId')),
  });

  useEffect(() => {
    if (isConfirmedContent && tempContentFormData) {
      handleConfirmedSubmitContent(tempContentFormData);
      setTempContentFormData(null);
      setIsConfirmedContent(false);
    }
  }, [isConfirmedContent]);

  const handleSubmitAddContent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget);
    setTempContentFormData(formData);
    setOpenAlertModalContent(true);
  };

  const handleConfirmedSubmitContent = async (formData: FormData) => {
    const time = formData.get('time') as string;
    const title = formData.get('title') as string;
    const type = formData.get('type') as string;
    const fileUrl = formData.get('fileUrl') as string;
    const fileName = formData.get('fileName') as string;
    const convertedTime = time.substring(0, 5);
    const chapterId = params.get('chapterId');

    if (chapterId && convertedTime && title && type) {
      try {
        await createContentAsync({
          body: fileName,
          duration: convertedTime,
          title,
          type,
          chapterId,
          isexam: 0,
          file: fileUrl,
        });
        setOpenModalAddContent(false);
        await queryClient.invalidateQueries({ queryKey: ['chapter'] });
        openModal({
          status: 'success',
          action: 'create',
          message: 'Content successfully created',
        });
      } catch (err) {
        console.error(err);
        openModal({
          status: 'error',
          action: 'create',
          message: 'Failed to create content',
        });
      }
    }
  };

  useEffect(() => {
    if (isConfirmedChapter && tempChapterFormData) {
      handleConfirmedSubmitChapter(tempChapterFormData);
      setTempChapterFormData(null);
      setIsConfirmedChapter(false);
    }
  }, [isConfirmedChapter]);

  const handleSubmitChapter = (form: HTMLFormElement, action: 'addContent' | 'submit' | 'addExam') => {
    const formData = new FormData(form);
    setTempChapterFormData(formData);
  
    if (action === 'addContent' || action === 'addExam') {
      setIsConfirmedChapter(true);
    } else {
      setOpenAlertModalChapter(true);
    }
  };

  const handleConfirmedSubmitChapter = async (formData: FormData) => {
    try {
      const moduleId = params.get('modulId');
      const chapter = formData.get('chapter') as string;
      // current chapterId
      const chapterId = params.get('chapterId');

      if (moduleId && chapter && !chapterId) {
        const response = await createChapterAsync({ moduleId, title: chapter });
        // get chapterId from  created chapter
        const chapterId = response.data.id;

        if (submitType.type === 'defaultSubmit') {
          openModal({
            status: 'success',
            action: 'create',
            message: 'chapter berhasil dibuat',
          });
          return router.replace(
            `/backoffice/manage-modul/create/?modulId=${moduleId}`,
          );
        }

        if (actionSubChapter === 'exam') {
          router.replace(
            pathname + '/add-exam' + '?' + createQuery('chapterId', chapterId),
          );
        } else {
          router.push(pathname + '?' + createQuery('chapterId', chapterId));
          setOpenModalAddContent(true);
        }
      } else if (moduleId && chapterId) {
        await editChapterAsync({ chapterId, title: chapter });

        if (submitType.type === 'defaultSubmit') {
          openModal({
            status: 'success',
            action: 'update',
            message: 'chapter berhasil diupdate',
          });
          return router.replace(
            `/backoffice/manage-modul/update/?modulId=${moduleId}`,
          );
        }

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
      openModal({ status: 'error', message: JSON.stringify(err) });
    }
  };

  return (
    <>
      <FormChapterView
        defaultValueData={dataChapter?.data}
        setActionSubChapter={setActionSubChapter}
        handleSubmitAddContent={handleSubmitAddContent}
        setSubmitType={setSubmitType}
        type={submitType.type}
        stateFormAddContent={{
          openModal: openModalAddContent,
          setOpenModal: setOpenModalAddContent,
        }}
        handleSubmitCreateChapter={handleSubmitChapter}
        contents={{
          data: dataChapter?.data?.contents,
          isLoading: isLoadingChapter,
        }}
      />
      <AlertModal
        openModal={openAlertModalChapter}
        setOpenModal={setOpenAlertModalChapter}
        setIsConfirmed={setIsConfirmedChapter}
        messageText={`Are you sure you want to submit this chapter?`}
      />
      <AlertModal
        openModal={openAlertModalContent}
        setOpenModal={setOpenAlertModalContent}
        setIsConfirmed={setIsConfirmedContent}
        messageText="Are you sure you want to add this content?"
      />
    </>
  );
};

export default FormChapter;
