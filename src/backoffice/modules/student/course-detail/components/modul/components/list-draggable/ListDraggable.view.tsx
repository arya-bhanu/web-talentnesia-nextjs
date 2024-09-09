import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { IListDraggable } from './listDraggableType.type';
import PlayCircle from '@/../public/icons/play-circle.svg';
import Book from '@/../public/icons/manage-program/book.svg';
import VideoCam from '@/../public/icons/videocam.svg';
import Pencil from '@/../public/icons/edit-2.svg';
import BookGray from '@/../public/icons/book3.svg';
import ClipboardTick from '@/../public/icons/clipboard-tick.svg';
import Task from '@/../public/icons/task.svg';
import { format, isFuture } from 'date-fns';

const ListDraggableView: React.FC<IListDraggable> = ({
  type,
  title,
  className,
  completed,
  date,
  courseId,
  chapterId,
  contentId,
}) => {
  const router = useRouter();

  const formattedDate = useMemo(() => {
    if (!date) return '';
    const dateObj = new Date(date);
    const formattedString = format(dateObj, "dd MMMM yyyy 'Pukul' HH:mm");
    return isFuture(dateObj) ? `Akses Mulai ${formattedString}` : formattedString;
  }, [date]); 

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
        return <Pencil />;
      case '6':
        return <VideoCam />;
      default:
        return <VideoCam />;
    }
  }, [type]);

  const statusIcon = completed ? <ClipboardTick /> : <Task />;

  const handleClick = () => {
    router.push(`/student/course/course-detail/material-modul/?courseId=${courseId}&chapterId=${chapterId}&contentId=${contentId}`);
  };

  return (
    <div 
      className={clsx('flex items-center justify-between cursor-pointer', className)}
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        {generateIcon}
        <div>
          <h3 className="font-semibold text-gray-800 text-sm font-lato">
            {title}
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-gray-400 text-sm font-lato">{formattedDate}</span>
        {statusIcon}
      </div>
    </div>
  );
};

export default ListDraggableView;
