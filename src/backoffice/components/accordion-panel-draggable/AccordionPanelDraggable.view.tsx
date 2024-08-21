import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { IAccordionPanelDraggable } from './accordionPanelDraggable.type';
import DragIndicator from '@/../public/icons/drag_indicator.svg';
import ArrowUp from '@/../public/icons/arrow-up.svg';
import Edit from '@/../public/icons/edit.svg';
import Trash from '@/../public/icons/trash.svg';
import clsx from 'clsx';
import { IStateChapter } from '@/backoffice/modules/manage-modul/components/chapter/chapter.type';
import ListDraggable from '../list-draggable';
import AlertModal from '../alert-modal/AlertModal';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { useDragpositionStore } from '@/lib/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { contentsReorder } from '@/backoffice/modules/manage-modul/api/manageModelApi';

const AccordionPanelDraggableView: React.FC<
  IAccordionPanelDraggable &
    IStateChapter & { index: number } & {
      openModal: boolean;
      setOpenModal: Dispatch<SetStateAction<boolean>>;
      isConfirmed: boolean;
      setIsConfirmed: Dispatch<SetStateAction<boolean>>;
      idDelete: string;
      setIdDelete: Dispatch<SetStateAction<string>>;
      handleEdit: () => void;
      chapterId?: string;
    }
> = ({
  totalCurriculum,
  totalMinuteDuration,
  activeAccordion,
  index,
  setActiveAccordion,
  title,
  contents,
  setIdDelete,
  setOpenModal,
  id,
  openModal,
  setIsConfirmed,
  handleEdit,
  chapterId,
}) => {
  const queryClient = useQueryClient();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const { sortActionContents, setSortContents, sortContents } =
    useDragpositionStore();

  const { mutateAsync: reorderContentsAsync } = useMutation({
    mutationKey: ['contents'],
    mutationFn: contentsReorder,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    if (contents) {
      const sortData = contents.sort((a, b) => a.order - b.order);
      if (sortData && sortData.length > 0) {
        setSortContents(sortData);
      }
    }
  }, [contents, index === activeAccordion]);

  useEffect(() => {
    if (chapterId && sortContents) {
      const executeMutation = async () => {
        if (sortContents && sortContents.length > 0) {
          try {
            const response = await reorderContentsAsync({
              chapterId,
              contents: sortContents.map((el) => el.id),
            });
            queryClient.invalidateQueries({ queryKey: ['module'] });
            console.log(response);
          } catch (err) {
            console.error(err);
          }
        }
      };
      executeMutation();
    }
  }, [sortContents]);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      sortActionContents(active, over);
    }
  };

  return (
    <div className="py-3">
      <AlertModal
        openModal={openModal}
        setIsConfirmed={setIsConfirmed}
        setOpenModal={setOpenModal}
      />
      <div ref={setNodeRef} style={style} className="flex items-center gap-4">
        <button
          type="button"
          {...listeners}
          {...attributes}
          className="cursor-move"
        >
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
          <button type="button" onClick={handleEdit}>
            <Edit />
          </button>
          <button
            type="button"
            onClick={() => {
              setOpenModal(true);
              setIdDelete(id);
            }}
          >
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
        {sortContents && (
          <DndContext
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={sortContents}>
              {sortContents.map((el, index) => (
                <ListDraggable key={index} {...el} />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};

export default AccordionPanelDraggableView;
