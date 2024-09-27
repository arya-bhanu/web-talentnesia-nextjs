import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';
import { IListDraggable } from './listDraggableType.type';
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
    const formattedString = format(dateObj, "dd MMM yyyy 'Pukul' HH:mm");
    return isFuture(dateObj)
      ? `Akses Mulai ${formattedString}`
      : formattedString;
  }, [date]);

  const generateIconSrc = useMemo(() => {
    switch (type) {
      case '1':
        return '/icons/manage-program/book.svg';
      case '2':
        return '/icons/play-circle.svg';
      case '3':
        return '/icons/play-circle.svg';
      case '4':
        return '/icons/play-circle.svg';
      case '5':
        return '/icons/edit-2.svg';
      case '6':
        return '/icons/videocam.svg';
      default:
        return '/icons/videocam.svg';
    }
  }, [type]);

  const statusIconSrc = completed
    ? '/icons/clipboard-tick.svg'
    : '/icons/manage-program/clipboard.svg';

  const handleClick = () => {
    router.push(
      `/student/course/course-detail/material-modul/?courseId=${courseId}&chapterId=${chapterId}&contentId=${contentId}`,
    );
  };

  return (
    <div
      className={clsx(
        'flex items-start gap-2 cursor-pointer p-2 sm:p-3',
        className,
      )}
      onClick={handleClick}
    >
      <Image
        src={generateIconSrc}
        alt="Content type"
        width={20}
        height={20}
        className="w-5 h-5 mt-1 flex-shrink-0"
      />
      <div className="flex-grow min-w-0">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-gray-800 text-xs sm:text-sm font-lato pr-2 flex-grow truncate">
            {title}
          </h3>
          <div className="flex items-center flex-shrink-0 ml-2">
            <span className="font-semibold text-gray-400 text-xs sm:text-sm font-lato mr-2 hidden sm:inline whitespace-nowrap">
              {formattedDate}
            </span>
            <Image
              src={statusIconSrc}
              alt="Status"
              width={20}
              height={20}
              className="w-5 h-5 flex-shrink-0"
            />
          </div>
        </div>
        <span className="font-semibold text-gray-400 text-xs sm:text-sm font-lato mt-1 block sm:hidden">
          {formattedDate}
        </span>
      </div>
    </div>
  );
};

export default ListDraggableView;
