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
import AlertModal from '../alert-modal';
import Modal from '@/backoffice/components/modal';
import FormContent from '@/backoffice/modules/manage-modul/components/form-content';

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
}) => {
  const renderMinuteTime = useMemo(() => {
    const [hours, minutes] = duration.split(':');
    return parseInt(hours) * 60 + parseInt(minutes);
  }, [duration]);

  const [injectId, setInjectId] = useState(id);
  useEffect(() => {
    setInjectId(id);
  }, [openModalEdit]);

  const Icon = useMemo(() => {
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
  }, [type]);
  return (
    <div className={clsx('flex items-center justify-between py-3', className)}>
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
        <button type="button">
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
          <button onClick={() => setOpenModalEdit(true)} type="button">
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
