'use client';
import React, { FormEvent, useEffect, useTransition } from 'react';
import FormExamView from './FormExam.view';
import { useRouter, useSearchParams } from 'next/navigation';
import { useExamStore, useQuestionExamStore } from '../add-exam/store';
import { APIExamChapter } from '@/backoffice/modules/manage-modul/manageModul.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { defaultExamData, defaultQuestionRadio } from './formExam.data';
import {
  createExam,
  updateExam,
  getExam,
  reorderExam,
} from '../add-exam/api/exam.api';

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
    setDataExam(defaultExamData);
    if (dataExam?.data?.data) {
      setDataExam({
        chapterId: dataExam.data?.data.chapterId,
        duration: dataExam.data?.data.duration,
        id: dataExam.data?.data.id,
        order: dataExam.data?.data.order,
        title: dataExam.data?.data.title,
        type: 5,
      });
      updateQuestion(dataExam.data?.data.exams);
    }
  }, [JSON.stringify(dataExam?.data)]);

  const { mutateAsync: createExamAsync } = useMutation({
    mutationFn: createExam,
    mutationKey: ['exam'],
  });

  const { mutateAsync: updateExamAsync } = useMutation({
    mutationFn: updateExam,
    mutationKey: ['exam'],
  });

  const { mutateAsync: reorderExamsAynsc } = useMutation({
    mutationFn: reorderExam,
    mutationKey: ['exam'],
  });

  const handleSubmitExam = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const chapterId = params.get('chapterId');
    const programId = params.get('programId');
    const examId = params.get('examId');
    const schoolId = params.get('schoolId');

    const formData = new FormData(e.currentTarget);
    const examName = formData.get('exam_name');

    try {
      if (examName && chapterId && programId) {
        const dataExam = {
          chapterId,
          duration: dataExamStore?.duration || '01.00',
          exams: question,
          title: examName,
          type: 5,
        } as APIExamChapter;

        if (examId) {
          console.log('updating program exam...');
          await updateExamAsync({ payload: dataExam, examId: examId });
          // console.log('reordering exam program...');
          // await reorderExamsAynsc({
          //   examId,
          //   questions: question.map((el) => el.id),
          // });
        } else {
          console.log('creating program exam...');
          await createExamAsync(dataExam);
          // console.log('reordering program exam...');
          // if (response?.data) {
          //   await reorderExamsAynsc({
          //     examId: response?.data.id,
          //     questions: question.map((el) => el.id),
          //   });
          // }
        }
        await queryClient.invalidateQueries({ queryKey: ['chapter'] });
        await queryClient.invalidateQueries({ queryKey: ['exam'] });
        setDataExam(defaultExamData);
        updateQuestion([]);
        startTransition(() => {
          router.replace(
            `/backoffice/manage-program/update-program/?programId=${programId}&schoolId=${schoolId}`,
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
