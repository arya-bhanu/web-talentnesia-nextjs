import React, { useMemo } from 'react';
import { IListDraggable } from './listDraggable.type';
import DragIndicator from '@/../public/icons/drag_indicator.svg';
import clsx from 'clsx';
import PlayCircle from '@/../public/icons/play-circle.svg';
import Edit2 from '@/../public/icons/edit-2.svg';
import Book from '@/../public/icons/manage-program/book.svg';
import Video from '@/../public/icons/videocam.svg';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const ListDraggableView: React.FC<IListDraggable> = ({
  className,
  title,
  durationMinute,
  isexam,
  type,
  id,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  const Icon = useMemo(() => {
    if (isexam) {
      return <Edit2 />;
    } else {
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
          return <Video />;
      }
    }
  }, [type]);
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx('flex items-center justify-between', className)}
    >
      <div className="flex items-center gap-2">
        <button type="button" {...listeners} {...attributes}>
          <DragIndicator />
        </button>
        {Icon}
        <h3 className="font-medium font-lato">{title}</h3>
      </div>
      <p className="font-semibold font-lato text-xs">{durationMinute} minute</p>
    </div>
  );
};

export default ListDraggableView;
