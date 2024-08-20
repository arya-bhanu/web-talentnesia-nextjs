import React from 'react';
import DragIndicator from '@/../public/icons/drag_indicator.svg';
import ArrowUp from '@/../public/icons/arrow-up.svg';
import clsx from 'clsx';
import ListDraggable from '../list-draggable';
import { IAccordionPanelDraggable } from './accordionPanelDraggable.type';

const AccordionPanelDraggableView: React.FC<IAccordionPanelDraggable & { index: number; open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }> = ({
  title,
  index,
  totalCurriculum,
  totalMinuteDuration,
  activeAccordion,
  setActiveAccordion,
  contents,
}) => {
  return (
    <div
      className={clsx('p-4', index === activeAccordion ? 'bg-[#219EBC0F]' : '')}
    >
      <div className="flex items-center gap-4">
        <button>
          <DragIndicator />
        </button>
        <div
          onClick={() => {
            if (index === activeAccordion) {
              setActiveAccordion(-1);
            } else {
              setActiveAccordion(index);
            }
          }}
          role="button"
          aria-pressed={false}
          className="flex items-center justify-between w-full cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="text-start">
              <h2 className="font-lato text-sm font-bold">{title}</h2>
              <div className="flex items-center gap-2 text-sm font-lato text-[#323232]">
                <p>{totalMinuteDuration} min</p>
                <p>{totalCurriculum} curriculum</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={clsx(
              'transition-all',
              index === activeAccordion ? 'rotate-0' : 'rotate-180',
            )}
          >
            <ArrowUp />
          </span>
        </div>
      </div>
      <div
        className={clsx(
          'flex flex-col gap-6 mt-7 pl-8',
          index === activeAccordion ? 'block' : 'hidden',
        )}
      >
        {contents.map((el, index) => (
          <ListDraggable key={index} {...el} />
        ))}
      </div>
    </div>
  );
};

export default AccordionPanelDraggableView;
