import React from 'react';

import DragIndicator from '@/../public/icons/drag_indicator.svg';
import ArrowUp from '@/../public/icons/arrow-up.svg';
import clsx from 'clsx';

import Edit from '@/../public/icons/manage-program/edit.svg';
import TrashXs from '@/../public/icons/manage-program/trash-xs.svg';
import AddXs from '@/../public/icons/manage-program/add-xs.svg';
import ClarityCertificate from '@/../public/icons/manage-program/clarity_certificate-line.svg';
import FluentShiftTeam from '@/../public/icons/manage-program/fluent_shifts-team-20-regular.svg';

import ListDraggable from '../list-draggable';
import {
  IAccordionPanelDraggable,
  IPopoverState,
} from './accordionPanelDraggable.type';
import MoreHoriz from '@/../public/icons/more_horiz.svg';
import PopoverAction from '@/backoffice/components/popover-action/PopoverAction';

const AccordionPanelDraggableView: React.FC<
  IAccordionPanelDraggable & { index: number } & IPopoverState
> = ({
  title,
  index,
  totalCurriculum,
  totalMinuteDuration,
  activeAccordion,
  setActiveAccordion,
  open,
  setOpen,
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
        </div>
        <div className="flex items-center gap-3">
          <PopoverAction
            openPopover={open}
            setOpenPopover={setOpen}
            content={
              <ul className="p-3 flex flex-col gap-3">
                <li className="flex items-center gap-2">
                  <FluentShiftTeam />
                  <button className="text-sm font-lato font-normal">
                    Mentoring
                  </button>
                </li>
                <li className="flex items-center gap-2">
                  <AddXs />
                  <button className="text-sm font-lato font-normal">
                    Add File Content
                  </button>
                </li>
                <li className="flex items-center gap-2">
                  <AddXs />
                  <button className="text-sm font-lato font-normal">
                    Add Exam
                  </button>
                </li>
                <li className="flex items-center gap-2">
                  <ClarityCertificate />
                  <button className="text-sm font-lato font-normal">
                    Certificate
                  </button>
                </li>
                <li className="flex items-center gap-2">
                  <Edit />
                  <button className="text-sm font-lato font-normal">
                    Edit
                  </button>
                </li>
                <li className="flex items-center gap-2">
                  <TrashXs />
                  <button className="text-sm font-lato font-normal">
                    Delete
                  </button>
                </li>
              </ul>
            }
            button={
              <button type="button">
                <MoreHoriz />
              </button>
            }
          />
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
        {/* {contents.map((el, index) => (
          <ListDraggable key={index} {...el} />
        ))} */}
      </div>
    </div>
  );
};

export default AccordionPanelDraggableView;
