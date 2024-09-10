import React, { Dispatch, FormEvent, SetStateAction, useMemo } from 'react';

import DragIndicator from '@/../public/icons/drag_indicator.svg';
import clsx from 'clsx';
import { IListDraggable, IListDraggableState } from './listDraggableType.type';
import PlayCircle from '@/../public/icons/play-circle.svg';
import Book from '@/../public/icons/manage-program/book.svg';
import Edit2 from '@/../public/icons/edit-2.svg';
import VideoCam from '@/../public/icons/videocam.svg';
import Calendar from '@/../public/icons/manage-program/calendar.svg';
import Detail from '@/../public/icons/manage-program/detail.svg';
import EditBtn from '@/../public/icons/manage-program/Edit-btn.svg';
import TrashBtn from '@/../public/icons/manage-program/trash-btn.svg';
import { formatDateIndonesian } from '@/helpers/formatter.helper';
import Modal from '@/backoffice/components/modal';
import FormSchedule from '../../form-program/components/form-schedule';
import FormContent from '../../form-program/components/form-course/components/form-content';
import AlertModal from '@/backoffice/components/alert-delete-modal';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { set } from 'date-fns';
import FormMentoring from '../../form-program/components/form-mentoring';

const ListDraggableView: React.FC<
  IListDraggable &
    IListDraggableState & {
      handleSubmitSchedule: (e: FormEvent<HTMLFormElement>) => void;
      handleSubmitModalMentoring: (e: FormEvent<HTMLFormElement>) => void;
      handleEditContent: (e: FormEvent<HTMLFormElement>) => void;
      handleEditMentoring: () => void;
      contentId: string;
      modalEditContent: boolean;
      modalEditMentoring: boolean;
      setModalEditContent: Dispatch<SetStateAction<boolean>>;
      setModalEditMentoring: Dispatch<SetStateAction<boolean>>;
      modalDelContent: boolean;
      setModalDelContent: Dispatch<SetStateAction<boolean>>;
      confirmDel: boolean;
      setConfirmDel: Dispatch<SetStateAction<boolean>>;
      handleDetailButton: () => void;
    }
> = ({
  type,
  title,
  date,
  className,
  durationMinute,
  modalSchedule,
  setModalSchedule,
  handleSubmitSchedule,
  handleSubmitModalMentoring,
  contentId,
  modalEditContent,
  handleEditMentoring,
  modalEditMentoring,
  setModalEditContent,
  setModalEditMentoring,
  handleEditContent,
  setModalDelContent,
  modalDelContent,
  confirmDel,
  setConfirmDel,
  isexam,
  ismonitoring,
  id,
  chapterId,
  handleDetailButton,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const programId = params.get('programId');
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const generateIcon = useMemo(() => {
    switch (type) {
      case '1':
        return <Book />;
      case '2':
        return <PlayCircle />;
      case '3':
        return <PlayCircle />;
      case '4':
        return <PlayCircle />;
      case '5':
        return <Edit2 />;
      default:
        return <VideoCam />;
    }
  }, [type]);
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx('flex items-center justify-between', className)}
    >
      <Modal
        title="Edit Schedule"
        state={{
          openModal: modalSchedule,
          setOpenModal: setModalSchedule,
        }}
        buttonConfirmTitle="Submit"
        handleSubmit={handleSubmitSchedule}
      >
        <FormSchedule contentId={contentId} />
      </Modal>
      <Modal
        title="Edit Content"
        state={{
          openModal: modalEditContent,
          setOpenModal: setModalEditContent,
        }}
        handleSubmit={handleEditContent}
      >
        <FormContent contentId={id} isEdit={true} />
      </Modal>
      <Modal
        title="Mentoring"
        buttonConfirmTitle="Submit"
        state={{
          openModal: modalEditMentoring,
          setOpenModal: setModalEditMentoring,
        }}
        handleSubmit={handleSubmitModalMentoring}
      >
        <FormMentoring chapterId={chapterId} isModalOpen={modalEditMentoring} />
      </Modal>

      <AlertModal
        openModal={modalDelContent}
        setIsConfirmed={setConfirmDel}
        setOpenModal={setModalDelContent}
      />
      <div className="flex items-center gap-2">
        <button type="button" {...listeners} {...attributes}>
          <DragIndicator />
        </button>
        {generateIcon}
        <div>
          <h3 className="font-medium font-lato">{title}</h3>
          <p className="text-xs text-[#989FAD] font-lato font-normal">
            {formatDateIndonesian(date)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p className="font-semibold font-lato text-xs">
          {durationMinute} minute
        </p>
        <button type="button" onClick={() => setModalSchedule(true)}>
          <Calendar />
        </button>
        <button type="button" onClick={handleDetailButton}>
          <Detail />
        </button>
        <button
          onClick={() => {
            if (isexam) {
              router.push(
                `/backoffice/manage-program/update-program-IICP/edit-exam/?examId=${id}&chapterId=${chapterId}&programId=${programId}`,
              );
            } else if (type === '6' || ismonitoring) {
              handleEditMentoring();
            } else {
              setModalEditContent(true);
            }
          }}
          type="button"
        >
          <EditBtn />
        </button>
        <button
          onClick={() => {
            setModalDelContent(true);
          }}
          type="button"
        >
          <TrashBtn />
        </button>
      </div>
    </div>
  );
};

export default ListDraggableView;
