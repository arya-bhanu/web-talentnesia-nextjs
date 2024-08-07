import React from 'react';
import { IAccordionPanelDraggable } from './accordionPanelDraggable.type';
import DragIndicator from '../../../../public/icons/drag_indicator.svg';
import ArrowUp from '../../../../public/icons/arrow-up.svg';
import Edit from '../../../../public/icons/edit.svg';
import Trash from '../../../../public/icons/trash.svg';
import ListDraggable from '../list-draggable';
import clsx from 'clsx';
import { IStateChapter } from '@/backoffice/modules/manage-modul/components/chapter/chapter.type';

const AccordionPanelDraggableView: React.FC<
  IAccordionPanelDraggable & IStateChapter & { index: number }
> = ({
  panelTitle,
  totalCurriculum,
  totalMinuteDuration,
  contents,
  activeAccordion,
  index,
  setActiveAccordion,
}) => {
  return (
    <div className="py-3">
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
              <h2 className="font-lato text-sm font-bold">{panelTitle}</h2>
              <div className="flex items-center gap-2 text-sm font-lato text-[#323232]">
                <p>{totalMinuteDuration} min</p>
                <p>{totalCurriculum} curriculum</p>
              </div>
            </div>
          </div>
          <span
            className={clsx(
              'transition-all',
              index === activeAccordion ? 'rotate-0' : 'rotate-180',
            )}
          >
            <ArrowUp />
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button>
            <Edit />
          </button>
          <button>
            <Trash />
          </button>
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
