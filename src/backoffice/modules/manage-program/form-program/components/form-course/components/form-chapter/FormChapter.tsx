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
} from '../../api/formCourse.api';
import useCreateQueryParams from '@/hooks/useCreateQueryParams';
import { ISubmitType } from './formChapter.type';
import { useStatusModalStore } from '@/lib/store';
import AlertModal from '@/backoffice/components/alert-modal';

const FormChapter = () => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const filteredPathname = pathname.replace(/\/(add|edit)-chapter/, '');
  const { openModal } = useStatusModalStore();
  const [openAlertModalChapter, setOpenAlertModalChapter] = useState(false);
  const [openAlertModalContent, setOpenAlertModalContent] = useState(false);
  const [tempChapterFormData, setTempChapterFormData] =
    useState<FormData | null>(null);
  const [tempContentFormData, setTempContentFormData] =
    useState<FormData | null>(null);
  const [alertMessageChapter, setAlertMessageChapter] = useState('');
  const [alertMessageContent, setAlertMessageContent] = useState('');
  const [isConfirmedChapter, setIsConfirmedChapter] = useState(false);
  const [isConfirmedContent, setIsConfirmedContent] = useState(false);
  const [isAddingContent, setIsAddingContent] = useState(false);


  const createQuery = useCreateQueryParams();
  const [actionSubChapter, setActionSubChapter] = useState<'exam' | 'content'>(
    'exam',
  );
  const [submitType, setSubmitType] = useState<ISubmitType>({
    type: 'nextSubmit',
  });
  const [openModalAddContent, setOpenModalAddContent] = useState(false);
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
    if (isConfirmedChapter && tempChapterFormData) {
      handleConfirmedSubmitChapter(tempChapterFormData);
      setTempChapterFormData(null);
      setIsConfirmedChapter(false);
    }
  }, [isConfirmedChapter]);

  useEffect(() => {
    if (isConfirmedContent && tempContentFormData) {
      handleConfirmedSubmitContent(tempContentFormData);
      setTempContentFormData(null);
      setIsConfirmedContent(false);
    }
  }, [isConfirmedContent]);

  useEffect(() => {
    if (!isConfirmedContent) {
      setIsAddingContent(false);
    }
  }, [isConfirmedContent]);
  

  const handleSubmitAddContent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingContent(true);
    setOpenAlertModalChapter(false);
    setIsConfirmedChapter(false);
    setIsConfirmedContent(false);
    const formData = new FormData(e.currentTarget);
    setTempContentFormData(formData);
    setAlertMessageContent('Are you sure you want to add this content?');
    setOpenAlertModalContent(true);
  };

  const handleConfirmedSubmitContent = async (formData: FormData) => {
    try {
      const time = formData.get('time') as string;
      const title = formData.get('title') as string;
      const type = formData.get('type') as string;
      const fileUrl = formData.get('fileUrl') as string;
      const fileName = formData.get('fileName') as string;
      const convertedTime = time.substring(0, 5);
      const chapterId = params.get('chapterId');

      if (chapterId && convertedTime && title && type && fileUrl) {
        await createContentAsync({
          body: fileUrl,
          duration: convertedTime,
          title,
          type,
          chapterId,
          isexam: 0,
          fileOrigin: fileName,
        });
        setOpenModalAddContent(false);
        await queryClient.invalidateQueries({ queryKey: ['chapter'] });
        openModal({
          status: 'success',
          action: 'create',
          message: 'Content successfully created',
        });
      }
    } catch (err) {
      console.error(err);
      openModal({
        status: 'error',
        action: 'create',
        message: 'Failed to create content',
      });
    }
  };

  const handleSubmitChapter = (form: HTMLFormElement, action: 'addContent' | 'submit' | 'addExam') => {
    const formData = new FormData(form);
    setTempChapterFormData(formData);
  
    if (action === 'addContent' || action === 'addExam') {
      setIsConfirmedChapter(true);
    } else {
      setAlertMessageChapter('Are you sure you want to submit this chapter?');
      setOpenAlertModalChapter(true);
    }
  };
  

  const handleConfirmedSubmitChapter = async (formData: FormData) => {
    try {
      const programId = params.get('programId');
      const chapter = formData.get('chapter') as string;
      const schoolId = params.get('schoolId');
      // current chapterId
      const chapterId = params.get('chapterId');

      if (programId && chapter && !chapterId) {
        const response = await createChapterAsync({
          programId,
          title: chapter,
        });
        // get chapterId from created chapter
        const chapterId = response.data.id;

        if (submitType.type === 'defaultSubmit') {
          // router.back()
          return router.push(
            `/backoffice/manage-program/update-program/?programId=${programId}&schoolId=${schoolId}`,
          );
        }

        if (actionSubChapter === 'exam') {
          router.replace(
            filteredPathname +
              '/add-exam' +
              '?' +
              createQuery('chapterId', chapterId),
          );
        } else {
          router.push(pathname + '?' + createQuery('chapterId', chapterId));
          setOpenModalAddContent(true);
        }
      } else if (programId && chapterId) {
        await editChapterAsync({ chapterId, title: chapter });

        if (submitType.type === 'defaultSubmit') {
          // router.back()
          return router.push(
            `/backoffice/manage-program/update-program/?programId=${programId}&schoolId=${schoolId}`,
          );
        }

        if (actionSubChapter === 'exam' && !isAddingContent) {
          router.replace(
            filteredPathname +
              '/add-exam' +
              '?' +
              createQuery('chapterId', chapterId),
          );
        } else {
          router.push(pathname + '?' + createQuery('chapterId', chapterId));
          setOpenModalAddContent(true);
        }
      }
    } catch (err) {
      console.error(err);
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
        messageText={alertMessageChapter}
      />
      <AlertModal
        openModal={openAlertModalContent}
        setOpenModal={setOpenAlertModalContent}
        setIsConfirmed={setIsConfirmedContent}
        messageText={alertMessageContent}
      />
    </>
  );
};

export default FormChapter;
