import React, { Dispatch, FormEvent, SetStateAction, useMemo } from 'react';

import DragIndicator from '@/../public/icons/drag_indicator.svg';
import clsx from 'clsx';
import { IListDraggable, IListDraggableState } from './listDraggableType.type';
import PlayCircle from '@/../public/icons/play-circle.svg';
import Book from '@/../public/icons/manage-program/book.svg';
import Edit2 from '@/../public/icons/edit-2.svg';
import VideoCam from '@/../public/icons/videocam.svg';
import Calendar from '@/../public/icons/manage-program/calendar.svg';
import EditBtn from '@/../public/icons/manage-program/Edit-btn.svg';
import TrashBtn from '@/../public/icons/manage-program/trash-btn.svg';
import { formatDateIndonesian } from '@/helpers/formatter.helper';
import Modal from '@/backoffice/components/modal';
import FormSchedule from '../../form-program/components/form-schedule';
import FormContent from '../../form-program/components/form-course/components/form-content';
import AlertModal from '@/backoffice/components/alert-modal';

const ListDraggableView: React.FC<
  IListDraggable &
    IListDraggableState & {
      handleSubmitSchedule: (e: FormEvent<HTMLFormElement>) => void;
      handleEditContent: (e: FormEvent<HTMLFormElement>) => void;
      contentId: string;
      modalEditContent: boolean;
      setModalEditContent: Dispatch<SetStateAction<boolean>>;
      modalDelContent: boolean;
      setModalDelContent: Dispatch<SetStateAction<boolean>>;
      confirmDel: boolean;
      setConfirmDel: Dispatch<SetStateAction<boolean>>;
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
  contentId,
  modalEditContent,
  setModalEditContent,
  handleEditContent,
  setModalDelContent,
  modalDelContent,
  confirmDel,
  setConfirmDel,
}) => {
  const generateIcon = useMemo(() => {
    switch (type) {
      case '1':
        return <PlayCircle />;
      case '2':
        return <Book />;
      case '3':
        return <Edit2 />;
      default:
        return <VideoCam />;
    }
  }, [type]);
  return (
    <div className={clsx('flex items-center justify-between', className)}>
      <Modal
        title="Edit Schedule"
        state={{
          openModal: modalSchedule,
          setOpenModal: setModalSchedule,
        }}
        buttonConfirmTitle="Submit"
        handleSubmit={handleSubmitSchedule}
      >
        <FormSchedule />
      </Modal>
      <Modal
        title="Edit Content"
        buttonConfirmTitle="Submit"
        state={{
          openModal: modalEditContent,
          setOpenModal: setModalEditContent,
        }}
        handleSubmit={handleEditContent}
      >
        <FormContent contentId={contentId} />
      </Modal>
      <AlertModal
        openModal={modalDelContent}
        setIsConfirmed={setConfirmDel}
        setOpenModal={setModalDelContent}
      />
      <div className="flex items-center gap-2">
        <button>
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
        <button onClick={() => setModalEditContent(true)} type="button">
          <EditBtn />
        </button>
        <button onClick={() => setModalDelContent(true)} type="button">
          <TrashBtn />
        </button>
      </div>
    </div>
  );
};

export default ListDraggableView;
