'use client';
import React, { FormEvent, useEffect, useState, useTransition } from 'react';
import FormExamView from './FormExam.view';
import { useRouter, useSearchParams } from 'next/navigation';
import { useExamStore, useQuestionExamStore } from '@/lib/store';
import { APIExamChapter } from '../../manageModul.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createExam,
  examReorder,
  getExam,
  updateExam,
} from '../../api/manageModelApi';
import { defaultQuestionRadio } from './formExam.data';

const FormExam: React.FC<{ className?: string }> = ({ className }) => {
  const params = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isPending, startTransition] = useTransition();
  const { question, updateQuestion } = useQuestionExamStore();
  const { setDataExam, dataExam: dataExamStore } = useExamStore();
  const examId = params.get('examId');

  const { data: dataExam } = useQuery({
    queryKey: ['exam', 'chapter', examId],
    queryFn: () => getExam(examId),
  });

  useEffect(() => {
    if (!isPending) {
      updateQuestion([defaultQuestionRadio]);
    }
  }, [isPending]);

  useEffect(() => {
    if (dataExam?.data) {
      setDataExam({
        chapterId: dataExam.data?.chapterId,
        duration: dataExam.data?.duration,
        id: dataExam.data?.id,
        order: dataExam.data?.order,
        title: dataExam.data?.title,
      });
      updateQuestion(dataExam.data?.exams);
    }
  }, [dataExam?.data]);

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

  const handleSubmitExam = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget);
    const examName = formData.get('exam_name');
    const chapterId = params.get('chapterId');
    const modulId = params.get('modulId');
    const examId = params.get('examId');

    try {
      if (examName && chapterId && modulId) {
        const dataExam = {
          chapterId,
          duration: dataExamStore.duration,
          exams: question,
          title: examName,
        } as APIExamChapter;

        if (examId) {
          console.log('updating exam...');
          await updateExamAsync({ data: dataExam, id: examId });
          console.log('reordering exam...');
          await reorderExamsAynsc({
            examId,
            questions: question.map((el) => el.id),
          });
        } else {
          console.log('creating exam...');
          const response = await createExamAsync(dataExam);
          console.log(response);
          // console.log('reordering exam...');
          // if (response?.data) {
          //   await reorderExamsAynsc({
          //     examId: response?.data.id,
          //     questions: question.map((el) => el.id),
          //   });
          // }
        }

        await queryClient.invalidateQueries({ queryKey: ['chapter'] });
        await queryClient.invalidateQueries({ queryKey: ['exam'] });
        startTransition(() => {
          router.replace(
            `/backoffice/manage-modul/create/chapter/?modulId=${modulId}&chapterId=${chapterId}`,
          );
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormExamView handleSubmitExam={handleSubmitExam} className={className} />
  );
};

export default FormExam;
