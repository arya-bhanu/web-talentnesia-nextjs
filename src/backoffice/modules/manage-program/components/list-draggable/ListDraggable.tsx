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
      await queryClient.invalidateQueries({
        queryKey: ['chapters', 'program', programId],
      });

      setModalEditContent(false);
    }
  };

  const handleEditMentoring = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const handleDetailButton = () => {
    router.push(`${pathname}/detail-program-iicp/?contentId=${props.id}&programId=${programId}`);
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
      contentId={props.id}
      confirmDel={isConfrmDel}
      setConfirmDel={setConfrmDel}
      modalDelContent={modalDelContent}
      setModalDelContent={setModalDelContent}
      handleDetailButton={handleDetailButton}
      {...props}
    />
  );
};

export default ListDraggable;
