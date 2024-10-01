import React from 'react';
import ArrowUp from '@/../public/icons/arrow-up.svg';
import clsx from 'clsx';
import { IAccordionPanelDraggable } from './accordionPanelDraggable.type';
import ListDraggable from '../list-draggable';
import Image from 'next/image';

const AccordionPanelDraggableView: React.FC<IAccordionPanelDraggable> = ({
  id: chapterId,
  title,
  index,
  contents,
  activeAccordion,
  setActiveAccordion,
  courseId,
}) => {
  const totalMinuteDuration = contents.reduce((acc, content) => {
    if (content.duration) {
      const [minutes] = content.duration.split(':').map(Number);
      return acc + (isNaN(minutes) ? 0 : minutes);
    }
    return acc;
  }, 0);

  return (
    <div className={clsx('p-2 sm:p-4', index === activeAccordion ? '' : '')}>
      <div className="flex items-center gap-2 sm:gap-4">
        <div
          onClick={() => {
            if (index === activeAccordion) {
              setActiveAccordion(-1);
            } else {
              setActiveAccordion(index);
            }
          }}
          role="button"
          aria-pressed={index === activeAccordion}
          className="flex items-center justify-between w-full cursor-pointer"
        >
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-start">
              <h2 className="font-lato text-xs sm:text-sm font-bold">
                {title}
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 font-lato text-xs sm:text-sm text-gray-800 font-bold">
                <p>{totalMinuteDuration} min</p>
                <p>{contents.length} curriculum</p>
              </div>
            </div>
          </div>
        </div>
        <span
          className={clsx(
            'transition-all flex-shrink-0',
            index === activeAccordion ? 'rotate-0' : 'rotate-180',
          )}
        >
          <Image
            src="/icons/arrow-up.svg"
            alt="Toggle accordion"
            width={24}
            height={24}
            className="w-4 h-4 sm:w-6 sm:h-6"
          />
        </span>
      </div>
      <div
        className={clsx(
          'flex flex-col gap-4 sm:gap-6',
          index === activeAccordion ? 'block' : 'hidden',
        )}
      >
        <div className="my-2 sm:my-4 border-t border-gray-300"></div>
        {contents.map((content) => (
          <ListDraggable
            key={content.id}
            title={content.title}
            type={content.type}
            completed={content.isCompleted === 1}
            date={content.date}
            courseId={courseId}
            chapterId={chapterId}
            contentId={content.id}
          />
        ))}
      </div>
    </div>
  );
};

export default AccordionPanelDraggableView;
