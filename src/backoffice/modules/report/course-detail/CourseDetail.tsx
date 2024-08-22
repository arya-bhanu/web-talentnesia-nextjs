'use client'

import React, { useState } from 'react';
import CoursesProgress from '@/backoffice/modules/program/components/courses-progres/CoursesProgress';
import AccordionPanelDraggable from '@/backoffice/modules/program/components/accordion-panel-draggable';
import { TableProgramData } from '../components/table-program/tableProgram.data';

interface ReportDetailProps {
  params: {
    id: string;
  };
}

const ReportDetail: React.FC<ReportDetailProps> = ({ params }) => {
  const { id } = params;
  const [activeAccordion, setActiveAccordion] = useState<number>(0);
  
  const programData = TableProgramData.find(program => program.id === id);

  if (!programData) {
    return <div>Program not found</div>;
  }

  return (
    <div className="p-4 bg-[#FFFFFF] rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-poppins font-semibold text-[25px]">
          Course Detail
        </h1>
      </div>
      
      <CoursesProgress
        progress={programData.progress}
        className="flex-1 mb-6"
        startDate="22 Maret 2024"
        endDate="10 September 2024"
        completedSessions={Math.round(programData.progress * 5)}
        totalSessions={500}
      />

      <AccordionPanelDraggable
        key={1}
        activeAccordion={activeAccordion}
        setActiveAccordion={setActiveAccordion}
        title={`UX Design Principles`}
        index={1}
        totalCurriculum={6}
        contents={[
          {
            date: new Date(),
            durationMinute: 30,
            title: 'UX Introduction',
            type: '1',
          },
          {
            date: new Date(),
            durationMinute: 20,
            title: 'Jacob\'s Law',
            type: '1',
          },
          {
            date: new Date(),
            durationMinute: 30,
            title: 'UX Introduction',
            type: '1',
          },
          {
            date: new Date(),
            durationMinute: 20,
            title: 'Jacob\'s Law',
            type: '2',
          },
          {
            date: new Date(),
            durationMinute: 30, 
            title: 'UX Introduction',
            type: '1',
          },
          {
            date: new Date(),
            durationMinute: 20,
            title: 'Jacob\'s Law',
            type: '2',
          },
          {
            date: new Date(),
            durationMinute: 30,
            title: 'UX Introduction',
            type: '1',
          },
          {
            date: new Date(),
            durationMinute: 20,
            title: 'Jacob\'s Law',
            type: '2',
          },
        ]}
        totalMinuteDuration={58}
      />
      <AccordionPanelDraggable
        key={2}
        activeAccordion={activeAccordion}
        setActiveAccordion={setActiveAccordion}
        title={`UI Design Principles`}
        index={2}
        totalCurriculum={6}
        contents={[
          {
            date: new Date(),
            durationMinute: 30,
            title: 'UX Introduction',
            type: '1',
          },
        ]}
        totalMinuteDuration={45}
      />
      <AccordionPanelDraggable
        key={3}
        activeAccordion={activeAccordion}
        setActiveAccordion={setActiveAccordion}
        title={`Pixel Perfect`}
        index={3}
        totalCurriculum={6}
        contents={[
          {
            date: new Date(),
            durationMinute: 30,
            title: 'UX Introduction',
            type: '1',
          },
        ]}
        totalMinuteDuration={40}
      />
    </div>
  );
};

export default ReportDetail;