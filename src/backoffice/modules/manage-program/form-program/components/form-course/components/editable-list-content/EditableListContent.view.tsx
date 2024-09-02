'use client';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  IEditableListContent,
  IEditHandler,
  IEditOpenModalState,
} from './editableListContent.type';
import clsx from 'clsx';
import DragIndicator from '@/../public/icons/drag_indicator.svg';
import Edit from '@/../public/icons/edit.svg';
import Trash from '@/../public/icons/trash.svg';
import PlayCircle from '@/../public/icons/play-circle.svg';
import Edit2 from '@/../public/icons/edit-2.svg';
import Book from '@/../public/icons/manage-program/book.svg';
import Video from '@/../public/icons/videocam.svg';
import AlertModal from '@/backoffice/components/alert-delete-modal';
import Modal from '@/backoffice/components/modal';
import FormContent from '../form-content';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const EditableListContentView: React.FC<
  IEditableListContent & { className?: string } & {
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    isConfirmed: boolean;
    setIsConfirmed: Dispatch<SetStateAction<boolean>>;
  } & IEditOpenModalState &
    IEditHandler
> = ({
  duration,
  title,
  className,
  type,
  setIsConfirmed,
  setOpenModal,
  openModal,
  openModalEdit,
  setOpenModalEdit,
  handleSubmitEdit,
  id,
  isexam,
}) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const progamId = params.get('programId');
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const renderMinuteTime = useMemo(() => {
    if (duration) {
      const [hours, minutes] = duration.split(':');
      return parseInt(hours) * 60 + parseInt(minutes);
    }
    return 0;
  }, [duration]);

  const [injectId, setInjectId] = useState(id);
  useEffect(() => {
    setInjectId(id);
  }, [openModalEdit]);

  const Icon = useMemo(() => {
    if (isexam) {
      return <Edit2 />;
    } else {
      switch (type) {
        case '1':
          return <Book />;
        case '2':
          return <Video />;
        case '3':
          return <PlayCircle />;
        case '4':
          return <Edit2 />;
      }
    }
  }, [type]);
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx('flex items-center justify-between py-3', className)}
    >
      <AlertModal
        openModal={openModal}
        setIsConfirmed={setIsConfirmed}
        setOpenModal={setOpenModal}
      />
      <Modal
        state={{
          openModal: openModalEdit,
          setOpenModal: setOpenModalEdit,
        }}
        handleSubmit={handleSubmitEdit}
        title="Update Content"
      >
        {openModalEdit && <FormContent contentId={injectId} />}
      </Modal>
      <div className="flex items-center gap-2">
        <button {...listeners} {...attributes} type="button">
          <DragIndicator />
        </button>
        {Icon}
        <h3 className="font-medium font-lato">{title}</h3>
      </div>
      <div className="flex items-center gap-3">
        <p className="font-semibold font-lato text-xs">
          {renderMinuteTime} minute
        </p>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              const chapterId = params.get('chapterId');
              if (isexam) {
                router.push(
                  `/backoffice/manage-program/update-program-IICP/edit-exam/?programId=${progamId}&chapterId=${chapterId}&examId=${id}`,
                );
              } else {
                setOpenModalEdit(true);
              }
            }}
            type="button"
          >
            <Edit />
          </button>
          <button
            type="button"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <Trash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditableListContentView;
