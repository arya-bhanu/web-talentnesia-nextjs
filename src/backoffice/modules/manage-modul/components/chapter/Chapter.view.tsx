import Link from 'next/link';
import React from 'react';
import { IChapter, IStateChapter } from './chapter.type';
import Add from '../../../../../../public/icons/add.svg';
import { IAccordionPanelDraggable } from '@/backoffice/components/accordion-panel-draggable/accordionPanelDraggable.type';
import AccordionPanelDraggable from '@/backoffice/components/accordion-panel-draggable';
import { Button } from 'flowbite-react';
const dataChapters: IAccordionPanelDraggable[] = [
  {
    panelTitle: 'UX Design Principles',
    totalCurriculum: 6,
    totalMinuteDuration: 58,
    contents: [
      {
        durationMinute: 30,
        iconSrc: '/icons/play-circle.svg',
        title: 'UX Introduction',
      },
      {
        durationMinute: 30,
        iconSrc: '/icons/play-circle.svg',
        title: 'Jacob’s Law',
      },
      {
        durationMinute: 30,
        iconSrc: '/icons/play-circle.svg',
        title: 'Concistency for your design',
      },
    ],
  },
  {
    panelTitle: 'UI Design Principles',
    totalCurriculum: 6,
    totalMinuteDuration: 58,
    contents: [
      {
        durationMinute: 30,
        iconSrc: '/icons/play-circle.svg',
        title: 'UX Introduction',
      },
      {
        durationMinute: 30,
        iconSrc: '/icons/play-circle.svg',
        title: 'UX Introduction',
      },
      {
        durationMinute: 30,
        iconSrc: '/icons/play-circle.svg',
        title: 'UX Introduction',
      },
      {
        durationMinute: 30,
        iconSrc: '/icons/play-circle.svg',
        title: 'UX Introduction',
      },
    ],
  },
  {
    panelTitle: 'Pixel Perfect',
    totalCurriculum: 6,
    totalMinuteDuration: 58,
    contents: [
      {
        durationMinute: 30,
        iconSrc: '/icons/play-circle.svg',
        title: 'Ethical Design',
      },
      {
        durationMinute: 30,
        iconSrc: '/icons/play-circle.svg',
        title: 'Ethical Design',
      },
      {
        durationMinute: 30,
        iconSrc: '/icons/play-circle.svg',
        title: 'Ethical Design',
      },
      {
        durationMinute: 30,
        iconSrc: '/icons/play-circle.svg',
        title: 'Ethical Design',
      },
    ],
  },
];

const ChapterView: React.FC<IChapter & IStateChapter> = ({
  className,
  activeAccordion,
  setActiveAccordion,
}) => {
  return (
    <section className={className}>
      <div className="flex items-center justify-between">
        <h2 className="font-poppins text-sm font-semibold text-[#323232]">
          Chapter
        </h2>
        <button type='submit' className="flex items-center focus:outline-none text-white bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
          <Add />
          <span className="text-black"> Add Modul</span>
        </button>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        {dataChapters.map((el, index) => (
          <AccordionPanelDraggable
            index={index}
            activeAccordion={activeAccordion}
            setActiveAccordion={setActiveAccordion}
            key={index}
            {...el}
          />
        ))}
      </div>
    </section>
  );
};

export default ChapterView;
