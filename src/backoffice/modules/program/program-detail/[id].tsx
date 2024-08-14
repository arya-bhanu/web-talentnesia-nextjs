"use client";

import React, { useState } from 'react';
import { programsData } from '../program.data';
import { TabFlex } from '@/backoffice/components/tabs/tabs';
import TableStudents from '@/backoffice/modules/manage-program/add-new-program/components/table-students';
import CoursesProgress from '@/backoffice/modules/program/components/courses-progres/CoursesProgress';
import AccordionPanelDraggable from '@/backoffice/modules/manage-program/components/accordion-panel-draggable';

interface ProgramDetailProps {
  params: {
    id: string;
  };
}

export default function ProgramDetail({ params }: ProgramDetailProps) {
  const { id } = params;
  const programDetails = programsData.find(program => program.id === id);
  const [activeAccordion, setActiveAccordion] = useState<number>(-1);

  if (!programDetails) {
    return <div>Program not found</div>;
  }

  const tabs = [
    {
      title: 'Student',
      content: (
        <div>
          <h1 className="font-poppins font-semibold text-[25px] mb-6">
            List Student
          </h1>
          <TableStudents className="mt-5" />
        </div>
      ),
    },
    {
      title: 'Course',
      content: (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-poppins font-semibold text-[25px]">
              Courses Detail
            </h1>
            <button
              className="flex items-center focus:outline-none text-black bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-3 me-2 dark:focus:ring-yellow-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Preview
            </button>
          </div>
          <CoursesProgress
            progress={50}
            className="flex-1"
            startDate="22 Maret 2024"
            endDate="10 September 2024"
            completedSessions={250}
            totalSessions={500}
          />
          <div className="mt-5">
            <AccordionPanelDraggable
              key={1}
              activeAccordion={activeAccordion}
              setActiveAccordion={setActiveAccordion}
              title="UX Design Principles"
              index={1}
              totalCurriculum={6}
              contents={[
                {
                  date: new Date(),
                  durationMinute: 30,
                  title: 'Law',
                  type: '1',
                },
                {
                  date: new Date(),
                  durationMinute: 20,
                  title: 'Law Hick',
                  type: '2',
                },
              ]}
              totalMinuteDuration={58}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <TabFlex tabs={tabs} />
    </div>
  );
}
