'use client';
import React, { useEffect, useMemo, useRef } from 'react';
import { IChapter, IStateChapter } from './chapter.type';
import Add from '@/../public/icons/add.svg';
import AccordionPanelDraggable from '@/backoffice/components/accordion-panel-draggable';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { useDragChapters } from '@/backoffice/modules/manage-modul/add-exam/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { chapterReorder } from '../../api/manageModelApi';
import { useSearchParams } from 'next/navigation';
import PermissionGranted from '@/backoffice/components/permission-granted/PermissionGranted';

const ChapterView: React.FC<IChapter & IStateChapter> = ({
  className,
  activeAccordion,
  setActiveAccordion,
  data,
}) => {
  const { setSortChapters, sortChapters, sortActionChapters } =
    useDragChapters();

  const queryClient = useQueryClient();
  const params = useSearchParams();
  const modulId = params.get('modulId');

  const { mutateAsync: reorderChapterAsync } = useMutation({
    mutationKey: ['order-chapter'],
    mutationFn: chapterReorder,
  });

  useEffect(() => {
    setSortChapters(null);
    if (data.chapters) {
      const sortData = data.chapters.sort((a, b) => a.order - b.order);
      setSortChapters(sortData);
    }
  }, [data.chapters, data.isLoading]);

  useEffect(() => {
    if (modulId && sortChapters) {
      const executeMutation = async () => {
        try {
          await reorderChapterAsync({
            modulId,
            chapters: sortChapters.map((el) => el.id),
          });
          queryClient.invalidateQueries({ queryKey: ['module'] });
        } catch (err) {
          console.error(err);
        }
      };
      executeMutation();
    }
  }, [JSON.stringify(sortChapters)]);

  const renderPanelDraggable = useMemo(() => {
    if (data.isLoading) {
      return <h1>Loading...</h1>;
    }

    if (sortChapters?.length === 0 || !sortChapters) {
      return <p>Empty content</p>;
    }

    const handleDragEnd = (e: DragEndEvent) => {
      const { active, over } = e;
      if (over && active.id !== over.id) {
        sortActionChapters(active, over);
      }
    };

    return (
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={sortChapters}>
          {sortChapters.map((el, index) => {
            return (
              <AccordionPanelDraggable
                index={index}
                activeAccordion={activeAccordion}
                setActiveAccordion={setActiveAccordion}
                key={el.id}
                chapterId={el.id}
                {...el}
              />
            );
          })}
        </SortableContext>
      </DndContext>
    );
  }, [sortChapters, activeAccordion, setActiveAccordion, data.isLoading]);
  return (
    <section className={className}>
      <div className="flex items-center justify-between mt-10">
        <h2 className="font-poppins text-sm font-semibold text-[#323232]">
          Chapter
        </h2>
        <PermissionGranted roleable role="manage-module.addChapter">
          <button
            type="submit"
            className={`flex items-center focus:outline-none text-white bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900 ${!modulId ? 'hidden' : ''}`}
          >
            <Add />
            <span className="text-black"> Add Chapter</span>
          </button>
        </PermissionGranted>
      </div>
      <div className="mt-5 flex flex-col gap-3">{renderPanelDraggable}</div>
    </section>
  );
};

export default ChapterView;
