import React, { useMemo } from 'react';
import { IListDraggable } from './listDraggable.type';
import DragIndicator from '@/../public/icons/drag_indicator.svg';
import Image from 'next/image';
import clsx from 'clsx';
import PlayCircle from '@/../public/icons/play-circle.svg';
import Edit2 from '@/../public/icons/edit-2.svg';
import Book from '@/../public/icons/manage-program/book.svg';
import Video from '@/../public/icons/videocam.svg';

const ListDraggableView: React.FC<IListDraggable> = ({
  className,
  title,
  durationMinute,
  type,
}) => {
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
    <div className={clsx('flex items-center justify-between', className)}>
      <div className="flex items-center gap-2">
        <button>
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
