import React, { useMemo } from 'react';
import DragIndicator from '@/../public/icons/drag_indicator.svg';
import clsx from 'clsx';
import { IListDraggable } from './listDraggable.type';
import PlayCircle from '@/../public/icons/play-circle.svg';
import Book from '@/../public/icons/manage-program/book.svg';
import Edit2 from '@/../public/icons/edit-2.svg';
import VideoCam from '@/../public/icons/videocam.svg';
import { formatDateIndonesian } from '@/helpers/formatter.helper';

const ListDraggableView: React.FC<IListDraggable & { onContentClick?: () => void }> = ({
  type,
  title,
  date,
  className,
  durationMinute,
  onContentClick, 
}) => {

  const formattedDate = date ? formatDateIndonesian(new Date(date)) : '';

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
    <div className={clsx('flex items-center justify-between', className)} onClick={onContentClick}>
      <div className="flex items-center gap-2">
        <button>
          <DragIndicator />
        </button>
        {generateIcon}
        <div>
          <h3 className="font-medium font-lato">{title}</h3>
          <p className="text-xs text-[#989FAD] font-lato font-normal">
          {formattedDate}
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
