import React, { useMemo } from 'react';
import { IChapter, IStateChapter } from './chapter.type';
import Add from '@/../public/icons/add.svg';
import AccordionPanelDraggable from '@/backoffice/components/accordion-panel-draggable';

const ChapterView: React.FC<IChapter & IStateChapter> = ({
  className,
  activeAccordion,
  setActiveAccordion,
  data,
}) => {
  const renderPanelDraggable = useMemo(() => {
    if (data.isLoading) {
      return <h1>Loading...</h1>;
    }

    if (data.chapters?.length === 0 || !data.chapters) {
      return <p>Empty content</p>;
    }

    return data.chapters.map((el, index) => {
      return (
        <AccordionPanelDraggable
          index={index}
          activeAccordion={activeAccordion}
          setActiveAccordion={setActiveAccordion}
          key={el.id}
          {...el}
        />
      );
    });
  }, [data, activeAccordion, setActiveAccordion]);
  return (
    <section className={className}>
      <div className="flex items-center justify-between mt-10">
        <h2 className="font-poppins text-sm font-semibold text-[#323232]">
          Chapter
        </h2>
        <button
          type="submit"
          className="flex items-center focus:outline-none text-white bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        >
          <Add />
          <span className="text-black"> Add Chapter</span>
        </button>
      </div>
      <div className="mt-5 flex flex-col gap-3">{renderPanelDraggable}</div>
    </section>
  );
};

export default ChapterView;
