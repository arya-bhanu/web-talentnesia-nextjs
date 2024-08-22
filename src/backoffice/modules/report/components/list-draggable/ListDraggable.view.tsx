import React, { useMemo, useState } from 'react';
import DragIndicator from '@/../public/icons/drag_indicator.svg';
import clsx from 'clsx';
import PlayCircle from '@/../public/icons/play-circle.svg';
import Book from '@/../public/icons/manage-program/book.svg';
import Edit2 from '@/../public/icons/edit-2.svg';
import VideoCam from '@/../public/icons/videocam.svg';
import GreenCheck from '@/../public/icons/green-check.svg'; 
import { formatDateIndonesian } from '@/helpers/formatter.helper';
import { IListDraggable } from './listDraggableType.type';
import { ModalExam } from '../modal-exam/ModalExam';

const ListDraggableView: React.FC<IListDraggable> = ({
  type,
  title,
  date,
  className,
  durationMinute,
  completed
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

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

  const handleTitleClick = () => {
    if (type === '3') {
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className={clsx('flex items-center justify-between', className)}>
        <div className="flex items-center gap-2">
          <button>
            <DragIndicator />
          </button> 
          {generateIcon}
          <div>
            <div className="flex gap-1 items-center">
              <h3
                className={clsx('font-medium font-lato', type === '3' && 'cursor-pointer')}
                onClick={handleTitleClick}
              >
                {title}
              </h3>
              {completed && <GreenCheck />}
            </div>
            <p className="text-xs text-[#989FAD] font-lato font-normal">
              {formatDateIndonesian(date)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <p className="font-semibold font-lato text-xs">
            {durationMinute} minute
          </p>
        </div>
      </div>

      {isModalOpen && (
        <ModalExam
          filter=""
          setFilter={() => {}}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default ListDraggableView;
