'use client';

import RedTrash from '@/../public/icons/red-trash.svg';
import React, { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/backoffice/components/data-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import { TabFlex } from '@/backoffice/components/tabs/tabs';
import CoursesProgress from '@/backoffice/modules/program/components/courses-progres/CoursesProgress';
import AccordionPanelDraggable from '@/backoffice/modules/program/components/accordion-panel-draggable';
import { ProgramData, programData } from './[id].data';
import { Popover } from 'flowbite-react';
import MoreHoriz from '../../../../../public/icons/more_horiz.svg';
import { useProgramIdAction } from './hooks/useProgramIdAction';
import Search from '@/../public/icons/iconamoon_search-bold.svg';
import Add from '@/../public/icons/add.svg';
import IdModal from './IdModal';

interface ProgramDetailProps {
  params: {
    id: string;
  };
}

const columnHelper = createColumnHelper<ProgramData>();

export default function ProgramDetail({ params }: ProgramDetailProps) {
  const { id } = params;
  const [filter, setFilter] = useState('');
  const [activeAccordion, setActiveAccordion] = useState<number>(-1);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const { handleDeleteProgram } = useProgramIdAction();

  const columns = useMemo<ColumnDef<ProgramData, any>[]>(
    () => [
      columnHelper.accessor((row, index) => index + 1, {
        id: 'no',
        header: ({ column }) => <SortingTable column={column} title="No" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('name', {
        header: ({ column }) => <SortingTable column={column} title="Name" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('email', {
        header: ({ column }) => <SortingTable column={column} title="Email" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('nis', {
        header: ({ column }) => <SortingTable column={column} title="NIS" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('id', {
        id: 'action',
        header: 'Action',
        cell: (info) => {
          const id = info.getValue();
          return (
            <button onClick={() => handleDeleteProgram(id)} className="hover:opacity-80">
              <RedTrash />
            </button>
          );
        },
      }),
    ],
    [handleDeleteProgram]
  );

  const handlePreviewClick = useCallback(() => {
    router.push(`/backoffice/program/${id}/detail`);
  }, [router, id]);

  const tabs = [
    {
      title: 'Student',
      content: (
        <div>
          <h1 className="font-poppins font-semibold text-[25px] mb-12">
            List Student
          </h1>
          <div className="flex justify-between mb-4">
            <div className="flex items-center max-w-xs w-full">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <Search />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search ..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center focus:outline-none text-white bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            >
              <Add />
              <span className="text-black"> Browse All</span>
            </button>
          </div>
          <DataTable
            data={programData}
            columns={columns}
            sorting={[{ id: 'name', desc: false }]}
            filter={{ Filter: filter, setFilter }}
          />
          <IdModal open={openModal} setOpen={setOpenModal} />
        </div>
      ),
      type: 'student',
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
              onClick={handlePreviewClick}
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
                  chapterId: '1',
                  isexam: false,
                  order: 1,
                  id: "1",
                },
                {
                  date: new Date(),
                  durationMinute: 20,
                  title: 'Law Hick',
                  type: '2',
                  chapterId: '2',
                  isexam: false,
                  order: 2,
                  id: "2",
                },
              ]}
              totalMinuteDuration={58}
            />
          </div>
        </div>
      ),
      type: 'course',
    },
  ];

  return (
    <div className="p-6">
      <TabFlex tabs={tabs} />
    </div>
  );
}
