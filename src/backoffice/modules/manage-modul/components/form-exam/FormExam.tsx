'use client';
import React, { FormEvent, useEffect, useState, useTransition } from 'react';
import FormExamView from './FormExam.view';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  useExamStore,
  useQuestionExamStore,
} from '@/backoffice/modules/manage-modul/add-exam/store';
import { APIExamChapter } from '../../manageModul.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createExam,
  examReorder,
  getExam,
  updateExam,
} from '../../api/manageModelApi';
import { defaultExamData, defaultQuestionRadio } from './formExam.data';
import { useStatusModalStore } from '@/lib/store';
import AlertModal from '@/backoffice/components/alert-modal';

const FormExam: React.FC<{ className?: string }> = ({ className }) => {
  const params = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { openModal } = useStatusModalStore();

  const [isPending, startTransition] = useTransition();
  const { question, updateQuestion } = useQuestionExamStore();
  const { setDataExam, dataExam: dataExamStore } = useExamStore();
  const examId = params.get('examId');

  const { data: dataExam } = useQuery({
    queryKey: ['exam', 'chapter', examId],
    queryFn: () => getExam(examId),
  });

  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [tempFormData, setTempFormData] = useState<FormData | null>(null);

  useEffect(() => {
    if (!isPending) {
      updateQuestion([defaultQuestionRadio]);
    }
  }, [isPending]);

  useEffect(() => {
    setDataExam(defaultExamData);
    if (dataExam) {
      setDataExam({
        chapterId: dataExam.chapterId,
        duration: dataExam.duration,
        id: dataExam.id,
        order: dataExam.order,
        title: dataExam.title,
        type: 5,
      });
      updateQuestion(dataExam.exams);
    }
  }, [JSON.stringify(dataExam)]);

  const { mutateAsync: createExamAsync } = useMutation({
    mutationFn: createExam,
    mutationKey: ['exam'],
  });

  const { mutateAsync: updateExamAsync } = useMutation({
    mutationFn: updateExam,
    mutationKey: ['exam'],
  });

  const { mutateAsync: reorderExamsAynsc } = useMutation({
    mutationFn: examReorder,
    mutationKey: ['exam'],
  });

  useEffect(() => {
    if (isConfirmed && tempFormData) {
      handleConfirmedSubmitExam(tempFormData);
      setTempFormData(null);
      setIsConfirmed(false);
    }
  }, [isConfirmed]);

  const handleSubmitExam = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setTempFormData(formData);
    setOpenAlertModal(true);
  };

  const handleConfirmedSubmitExam = async (formData: FormData) => {
    const examName = formData.get('exam_name');
    const chapterId = params.get('chapterId');
    const modulId = params.get('modulId');
    const examId = params.get('examId');

    try {
      if (examName && chapterId && modulId) {
        const dataExam = {
          chapterId,
          duration: dataExamStore?.duration || '01.00',
          exams: question,
          title: examName,
          type: 5,
        } as APIExamChapter;

        if (examId) {
          // console.log('updating exam...');
          await updateExamAsync({ data: dataExam, id: examId });
          // console.log('reordering exam...');
          // await reorderExamsAynsc({
          //   examId,
          //   questions: question.map((el) => el.id),
          // });
          openModal({
            status: 'success',
            action: 'update',
            message: 'Exam berhasil diupdate',
          });
        } else {
          console.log('creating exam...');
          const response = await createExamAsync(dataExam);
          console.log(response);
          openModal({
            status: 'success',
            action: 'create',
            message: 'Exam berhasil dibuat',
          });
        }
        await queryClient.invalidateQueries({ queryKey: ['chapter'] });
        await queryClient.invalidateQueries({ queryKey: ['exam'] });
        setDataExam(defaultExamData);
        updateQuestion([]);
        startTransition(() => {
          router.replace(
            `/backoffice/manage-modul/create/chapter/?modulId=${modulId}&chapterId=${chapterId}`,
          );
        });
      }
    } catch (err) {
      console.error(err);
      openModal({
        status: 'error',
        action: examId ? 'update' : 'create',
        message: `Failed to ${examId ? 'update' : 'create'} exam`,
      });
    }
  };

  return (
    <>
      <FormExamView handleSubmitExam={handleSubmitExam} className={className} />
      <AlertModal
        openModal={openAlertModal}
        setOpenModal={setOpenAlertModal}
        setIsConfirmed={setIsConfirmed}
        messageText={`Are you sure you want to ${params.get('examId') ? 'update' : 'create'} this exam?`}
      />
    </>
  );
};

export default FormExam;
