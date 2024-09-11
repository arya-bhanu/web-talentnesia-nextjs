import React, { FormEvent, useEffect, useState } from 'react';
import ListDraggableView from './ListDraggable.view';
import { IListDraggable } from './listDraggableType.type';
import { APIContentChapter } from '@/backoffice/modules/manage-modul/manageModul.type';
import {
  deleteContent,
  editContent,
  updateSchedule,
} from '../../form-program/components/form-course/api/formCourse.api';
import { deleteExam } from '../../form-program/components/add-exam/api/exam.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useFormScheduleStore } from '../../form-program/components/form-schedule/formSchedule.store';
import { usePathname, useRouter } from 'next/navigation';
import { useFormMentoringStore } from '../../form-program/components/form-mentoring/formMentoring.store';
import { convertDateToStr, convertHHmmTime, convertTimeHHmmssToDate } from '@/helpers/formatter.helper';
import { editMentoring } from '../../form-program/components/form-mentoring/api/formMentoring.api';

const ListDraggable: React.FC<IListDraggable> = (props) => {
  const params = useSearchParams();
  const [modalSchedule, setModalSchedule] = useState(false);
  const [modalEditContent, setModalEditContent] = useState(false);
  const [modalEditMentoring, setModalEditMentoring] = useState(false);
  const [modalDelContent, setModalDelContent] = useState(false);
  const [isConfrmDel, setConfrmDel] = useState(false);
  const queryClient = useQueryClient();
  const programId = params.get('programId');
  const { content } = useFormScheduleStore();
  const {
    setDefaultMentoring,
    setTimeStart,
    setTimeEnd,
    setDate,
    setIdDefaultMentoring,
  } = useFormMentoringStore();
  const { timeStart, date, timeEnd, idDefaultMentoring } = useFormMentoringStore();
  const pathname = usePathname();
  const router = useRouter();

  const { mutateAsync: updateScheduleAasync } = useMutation({
    mutationKey: ['schedule'],
    mutationFn: updateSchedule,
  });

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

  const { mutateAsync: editMentoringAsync } = useMutation({
    mutationKey: ['update', 'mentor'],
    mutationFn: editMentoring,
  });

  useEffect(() => {
    if (isConfrmDel) {
      handleDeleteContent(props.isexam, props.id);
    }
  }, [isConfrmDel]);

  const handleSubmitSchedule = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (content && content.date) {
      const response = await updateScheduleAasync({
        contentId: props.id,
        payload: {
          date: content.date,
          duration: content.duration,
        },
      });
      console.log(response);
      await queryClient.invalidateQueries({
        queryKey: ['chapters', 'program', programId],
      });
      setModalSchedule(false);
    }
  };

  const handleDeleteContent = async (isexam: boolean, id: string) => {
    try {
      isexam ? await deleteContentAsync(id) : await deleteExamAsync(id);
      await queryClient.invalidateQueries({
        queryKey: ['chapters', 'program', programId],
      });
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
    const fileUrl = formData.get('fileUrl') as string;
    const fileName = formData.get('fileName') as string;
    const convertedTime = time.substring(0, 5);

    if (props.id) {
      await editContentAsync({
        contentId: props.id,
        payload: {
          duration: convertedTime,
          title,
          type,
          body: fileName,
          isexam: 0,
          chapterId: props.chapterId,
          id: props.id,
          order: props.order,
        },
      });
      await queryClient.invalidateQueries({
        queryKey: ['chapters', 'program', programId],
      });

      setModalEditContent(false);
    }
  };

  const handleEditMentoring = () => {
    setDefaultMentoring({
      title: props.title,
      mentorId: props.mentorId || '',
      startTime: props.startTime || '',
      endTime: props.endTime || '',
      date: props.date ? props.date.toISOString() : '',
      link: props.link || '',
      location: null,
    });
  
    setTimeStart(convertTimeHHmmssToDate(props.startTime || ''));
    setTimeEnd(convertTimeHHmmssToDate(props.endTime || ''));
    setDate(new Date(props.date).toString());
    setIdDefaultMentoring(props.id);
  
    setModalEditMentoring(true);
  };

  const handleSubmitModalMentoring = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('mentoring_name') as string;
    const mentorId = formData.get('mentor') as string;
    const link = formData.get('url') as string;

    await editMentoringAsync({
      mentoringId: idDefaultMentoring || '',
      payload: {
        link,
        location: null,
        title,
        chapterId: props.chapterId,
        mentorId,
        endTime: convertHHmmTime(timeEnd),
        startTime: convertHHmmTime(timeStart),
        date: convertDateToStr(new Date(date)),
      },
    });

    queryClient.invalidateQueries({
      queryKey: ['mentoring', 'list', props.chapterId],
    });

    setModalEditMentoring(true);
  };

  const handleDetailButton = () => {
    router.push(
      `${pathname}/detail-program/?contentId=${props.id}&programId=${programId}`,
    );
  };

  return (
    <ListDraggableView
      modalSchedule={modalSchedule}
      setModalSchedule={setModalSchedule}
      modalEditContent={modalEditContent}
      modalEditMentoring={modalEditMentoring}
      setModalEditContent={setModalEditContent}
      setModalEditMentoring={setModalEditMentoring}
      handleSubmitSchedule={handleSubmitSchedule}
      handleEditContent={handleEditContent}
      handleEditMentoring={handleEditMentoring}
      contentId={props.id}
      confirmDel={isConfrmDel}
      setConfirmDel={setConfrmDel}
      modalDelContent={modalDelContent}
      setModalDelContent={setModalDelContent}
      handleDetailButton={handleDetailButton}
      handleSubmitModalMentoring={handleSubmitModalMentoring}
      {...props}
    />
  );
};

export default ListDraggable;
