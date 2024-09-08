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
import { ModalMentoring } from '../modal-mentoring/ModalMentoring';

const ListDraggableView: React.FC<IListDraggable> = ({
  type,
  title,
  date,
  className,
  durationMinute,
  completed,
}) => {
  const [isExamModalOpen, setExamModalOpen] = useState(false);
  const [isMentorModalOpen, setMentorModalOpen] = useState(false);

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

  const handleTitleClick = () => {
    if (type === '3') {
      setExamModalOpen(true);
    } else if (type === '4') {
      setMentorModalOpen(true);
    }
    else {
      return;
    }
  };

  const closeExamModal = () => {
    setExamModalOpen(false);
  };

  const closeMentorModal = () => {
    setMentorModalOpen(false);
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
                className={clsx('font-medium font-lato cursor-pointer')}
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

      {isExamModalOpen && (
        <ModalExam filter="" setFilter={() => {}} closeModal={closeExamModal} />
      )}

      {isMentorModalOpen && (
        <ModalMentoring
          filter=""
          setFilter={() => {}}
          closeModal={closeMentorModal}
        />
      )}
    </>
  );
};

export default ListDraggableView;
