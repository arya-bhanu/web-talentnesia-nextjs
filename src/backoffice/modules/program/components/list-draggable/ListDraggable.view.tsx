import React, { useMemo } from 'react';

import DragIndicator from '@/../public/icons/drag_indicator.svg';
import clsx from 'clsx';
import { IListDraggable } from './listDraggableType.type';
import PlayCircle from '@/../public/icons/play-circle.svg';
import Book from '@/../public/icons/manage-program/book.svg';
import Edit2 from '@/../public/icons/edit-2.svg';
import VideoCam from '@/../public/icons/videocam.svg';
import Calendar from '@/../public/icons/manage-program/calendar.svg';
import EditBtn from '@/../public/icons/manage-program/Edit-btn.svg';
import TrashBtn from '@/../public/icons/manage-program/trash-btn.svg';
import { formatDateIndonesian } from '@/helpers/formatter.helper';

const ListDraggableView: React.FC<IListDraggable> = ({
  type,
  title,
  date,
  className,
  durationMinute,
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
      </div>
    </div>
  );
};

export default ListDraggableView;
