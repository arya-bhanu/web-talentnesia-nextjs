import { convertTimeToMinutes } from '@/helpers/formatter.helper';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useFormCourseStore } from '../../formCourse.store';
import AccordionPanelDraggable from '@/backoffice/modules/manage-program/components/accordion-panel-draggable';
import clsx from 'clsx';
import { useDragChapters } from '../../../add-exam/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { reorderChapter } from '../../api/formCourse.api';
import { SortableContext } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

const ContainerChapterView = ({
  activeAccordion,
  setActiveAccordion,
  className,
}: {
  activeAccordion: number;
  setActiveAccordion: Dispatch<SetStateAction<number>>;
  className?: string;
}) => {
  const { setSortChapters, sortChapters, sortActionChapters } =
    useDragChapters();
  const { data } = useFormCourseStore();
  const queryClient = useQueryClient();
  const params = useSearchParams();
  const programId = params.get('programId');

  const { mutateAsync: reorderChapterAsync } = useMutation({
    mutationFn: reorderChapter,
    mutationKey: ['chapter', 'reorder'],
  });

  useEffect(() => {
    setSortChapters(null);
    if (data) {
      const sortData = data.chapters.sort((a, b) => a.order - b.order);
      if (sortData && sortData.length > 0) {
        setSortChapters(sortData);
      }
    }
  }, [JSON.stringify(data?.chapters)]);

  useEffect(() => {
    if (programId && sortChapters) {
      const executeMutation = async () => {
        if (sortChapters && sortChapters.length > 0) {
          try {
            await reorderChapterAsync({
              programId,
              chapters: sortChapters.map((el) => el.id),
            });
            queryClient.invalidateQueries({ queryKey: ['module'] });
          } catch (err) {
            console.error(err);
          }
        }
      };
      executeMutation();
    }
  }, [JSON.stringify(sortChapters)]);

  function handleDragEnd(event: DragEndEvent): void {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      sortActionChapters(active, over);
    }
  }

  return (
    <div className={clsx(className)}>
      {sortChapters ? (
        <DndContext
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={sortChapters}>
            {sortChapters.map((el, index) => (
              <AccordionPanelDraggable
                id={el.id}
                key={el.id}
                activeAccordion={activeAccordion}
                setActiveAccordion={setActiveAccordion}
                title={el.title}
                index={index}
                totalCurriculum={6}
                contents={el.contents.map((el) => {
                  return {
                    date: new Date(),
                    durationMinute: convertTimeToMinutes(el.duration),
                    title: el.title,
                    type: el.type,
                    chapterId: el.chapterId,
                    id: el.id,
                    order: el.order,
                    isexam: Boolean(el.isexam),
                  };
                })}
                totalMinuteDuration={58}
              />
            ))}
          </SortableContext>
        </DndContext>
      ) : (
        <p>Chapters Empty ...</p>
      )}
    </div>
  );
};

export default ContainerChapterView;
