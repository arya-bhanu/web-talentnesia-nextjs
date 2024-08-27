import { convertTimeToMinutes } from '@/helpers/formatter.helper';
import React, { Dispatch, SetStateAction } from 'react';
import { useFormCourseStore } from '../../formCourse.store';
import AccordionPanelDraggable from '@/backoffice/modules/manage-program/components/accordion-panel-draggable';

const ContainerChapterView = ({
  activeAccordion,
  setActiveAccordion,
}: {
  activeAccordion: number;
  setActiveAccordion: Dispatch<SetStateAction<number>>;
}) => {
  const { data } = useFormCourseStore();
  return (
    <div className="mt-5">
      {data ? (
        data.chapters.map((el, index) => (
          <AccordionPanelDraggable
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
              };
            })}
            totalMinuteDuration={58}
          />
        ))
      ) : (
        <p>Chapters Empty ...</p>
      )}
    </div>
  );
};

export default ContainerChapterView;
