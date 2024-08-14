import React from 'react';
import { IListDraggable } from './listDraggable.type';
import DragIndicator from '../../../../public/icons/drag_indicator.svg';
import Image from 'next/image';
import clsx from 'clsx';

const ListDraggableView: React.FC<IListDraggable> = ({
  className,
  title,
  durationMinute,
}) => {
  return (
    <div className={clsx('flex items-center justify-between', className)}>
      <div className="flex items-center gap-2">
        <button>
          <DragIndicator />
        </button>
        {/* <Image width={24} height={24} alt="icon chapter" src={iconSrc} /> */}
        <h3 className="font-medium font-lato">{title}</h3>
      </div>
      <p className="font-semibold font-lato text-xs">{durationMinute} minute</p>
    </div>
  );
};

export default ListDraggableView;
