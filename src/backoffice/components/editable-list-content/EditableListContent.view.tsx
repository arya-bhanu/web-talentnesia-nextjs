import React, { useCallback, useMemo } from 'react';
import { IEditableListContent } from './editableListContent.type';
import Image from 'next/image';
import clsx from 'clsx';
import DragIndicator from '@/../public/icons/drag_indicator.svg';
import Edit from '@/../public/icons/edit.svg';
import Trash from '@/../public/icons/trash.svg';

const EditableListContentView: React.FC<
  IEditableListContent & { className?: string }
> = ({ duration, title, className }) => {
  const renderMinuteTime = useMemo(() => {
    const [hours, minutes] = duration.split(':');
    return parseInt(hours) * 60 + parseInt(minutes);
  }, [duration]);
  return (
    <div className={clsx('flex items-center justify-between py-3', className)}>
      <div className="flex items-center gap-2">
        <button type="button">
          <DragIndicator />
        </button>
        {/* <Image width={24} height={24} alt="icon chapter" src={urlImg} /> */}
        <h3 className="font-medium font-lato">{title}</h3>
      </div>
      <div className="flex items-center gap-3">
        <p className="font-semibold font-lato text-xs">
          {renderMinuteTime} minute
        </p>
        <div className="flex items-center gap-2.5">
          <button>
            <Edit />
          </button>
          <button>
            <Trash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditableListContentView;
