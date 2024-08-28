import React, { useMemo } from 'react';
import clsx from 'clsx';
import { IListDraggable } from './listDraggableType.type';
import PlayCircle from '@/../public/icons/play-circle.svg';
import Book from '@/../public/icons/manage-program/book.svg';
import VideoCam from '@/../public/icons/videocam.svg';
import Pencil from '@/../public/icons/edit-2.svg';
import BookGray from '@/../public/icons/book3.svg';
import ClipboardTick from '@/../public/icons/clipboard-tick.svg';
import Task from '@/../public/icons/task.svg';

const ListDraggableView: React.FC<IListDraggable> = ({
  type,
  title,
  className,
  status,
  date,
  completed,
}) => {
  const generateIcon = useMemo(() => {
    switch (type) {
      case '1':
        return <PlayCircle />;
      case '2':
        return <Book />;
      case '3':
        return <VideoCam />;
      case '4':
        return <Pencil />;
      case '5':
        return <BookGray />;
      default:
        return <VideoCam />;
    }
  }, [type]);

  const displayText = useMemo(() => {
    if (completed) {
      return (
        <>
          <span className="font-semibold text-gray-800 text-sm font-lato">18 Maret 2024 Pukul 23:00</span>
          <ClipboardTick />
        </>
      );
    } else {
      return (
        <>
          <span className="font-semibold text-gray-400 text-sm font-lato">Akses Mulai 23 Maret 2024 Pukul 23:59</span>
          <Task />
        </>
      );
    }
  }, [completed]);

  return (
    <div className={clsx('flex items-center justify-between', className)}>
      <div className="flex items-center gap-2">
        {generateIcon}
        <div>
          <h3 className="font-semibold text-gray-800 text-sm font-lato">
            {title}
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {displayText}
      </div>
    </div>
  );
};

export default ListDraggableView;
