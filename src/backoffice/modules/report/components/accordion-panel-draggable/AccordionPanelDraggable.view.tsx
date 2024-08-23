import React from 'react';

import DragIndicator from '@/../public/icons/drag_indicator.svg';
import ArrowUp from '@/../public/icons/arrow-up.svg';
import clsx from 'clsx';
import ListDraggable from '../list-draggable';
import {
  IAccordionPanelDraggable,
  IPopoverState,
} from './accordionPanelDraggable.type';

const AccordionPanelDraggableView: React.FC<
  IAccordionPanelDraggable & { index: number } & IPopoverState
> = ({
  title,
  index,
  totalCurriculum,
  totalMinuteDuration,
  activeAccordion,
  setActiveAccordion,
  contents,
  status
}) => {
  return (
    <div
      className={clsx('p-4', index === activeAccordion ? '' : '')}
    >
      <div className="flex items-center gap-4">
        <button>
          <DragIndicator />
        </button>
        <div
          onClick={() => {
            if (index == activeAccordion) {
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

          {status && (
            <span
              className={clsx(
                'text-base px-3 py-2 rounded-lg',
                status === 'Delivered' && 'bg-[#E7F8F0] text-[#12B76A]',
                status === 'Finished' && 'bg-blue-100 text-blue-700',
                status === 'Canceled' && 'bg-red-100 text-red-700'
              )}
            >
              {status}
            </span>
          )}
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
