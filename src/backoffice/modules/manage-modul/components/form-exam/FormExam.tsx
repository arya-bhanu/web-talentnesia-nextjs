'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import FormExamView from './FormExam.view';
import { useRouter, useSearchParams } from 'next/navigation';
import { useExamStore, useQuestionExamStore } from '@/lib/store';
import { APIExamChapter } from '../../manageModul.type';
import { convertHHmmTime } from '@/helpers/formatter.helper';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createExam, getExam } from '../../api/manageModelApi';
import { defaultQuestionRadio } from './formExam.data';

const timeDate = new Date();
timeDate.setHours(1);
timeDate.setMinutes(0);

const FormExam: React.FC<{ className?: string }> = ({ className }) => {
  const params = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [time, setTime] = useState(timeDate);
  const { question, updateQuestion } = useQuestionExamStore();
  const { setDataExam } = useExamStore();
  const examId = params.get('examId');

  const { data: dataExam } = useQuery({
    queryKey: ['exam', 'chapter', examId],
    queryFn: () => getExam(examId),
  });

  useEffect(() => {
    if (dataExam?.data) {
      setDataExam({
        chapterId: dataExam.data?.chapterId,
        duration: dataExam.data?.duration,
        id: dataExam.data?.id,
        order: dataExam.data?.order,
        title: dataExam.data?.title,
      });
      updateQuestion([dataExam.data?.exams]);
    }
  }, [dataExam?.data]);
  
  const { mutateAsync: createExamAsync } = useMutation({
    mutationFn: createExam,
    mutationKey: ['exam'],
  });

  const handleSubmitExam = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget);
    const examName = formData.get('exam_name');
    const chapterId = params.get('chapterId');
    const modulId = params.get('modulId');
    try {
      if (examName && chapterId && modulId) {
        const dataExam = {
          chapterId,
          duration: convertHHmmTime(time),
          exams: question,
          title: examName,
        } as APIExamChapter;
        await createExamAsync(dataExam);
        await queryClient.invalidateQueries({ queryKey: ['chapter'] });
        await queryClient.invalidateQueries({ queryKey: ['exam'] });
        router.replace(
          `/backoffice/manage-modul/create/chapter/?modulId=${modulId}&chapterId=${chapterId}`,
        );
        updateQuestion([defaultQuestionRadio]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormExamView
      handleSubmitExam={handleSubmitExam}
      className={className}
      setTime={setTime}
      time={time}
    />
  );
};

export default FormExam;
