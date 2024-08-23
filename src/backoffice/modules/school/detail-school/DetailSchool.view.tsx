'use client';

import { Card, } from 'flowbite-react';
import { TabFlex } from '@/backoffice/components/tabs/tabs';
import { IAddSchoolView } from './detailSchool.type';
import Search from '@/../public/icons/iconamoon_search-bold.svg';
import { Dispatch, FormEvent, SetStateAction } from 'react';
import ModalAddProgram from '@/backoffice/components/modal-add-program/ModalAddProgram';
import DetailSchoolPage from './components/detail-course';
import ListTableStudent from './components/list-table-student';
import ListProgramCard from './components/list-program-card';
import { IAccordionPanelDraggable } from '../components/accordion-panel-draggable/accordionPanelDraggable.type';

function AddSchoolView({
  open,
  selected,
  setOpen,
  setSelected,
  columns,
  rows,
}: IAddSchoolView &
  Pick<IAccordionPanelDraggable, 'activeAccordion' | 'setActiveAccordion'> & {
    openModalModul: boolean;
    setOpenModalModul: Dispatch<SetStateAction<boolean>>;
    handleSubmitSelectedModul: (e: FormEvent<HTMLFormElement>) => void;
    className?: string;
  }) {

  const tabs = [
    {
      title: 'Detail School',
      content: (
        <div>
            <DetailSchoolPage />
        </div>
      ),
    },
    {
      title: 'Student',
      content: (
        <div>
          <h1 className="font-bold text-base text-gray-800 mb-4">List Student</h1>
          <div className="flex justify-between">
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search ..."
                  required
                />
              </div>
            </div>
          </div>
          <ListTableStudent className="mt-5" />
        </div>
      ),
    },    
    {
      title: 'Program',
      content: (
        <div>
          <div className="flex justify-between">
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
                  required
                />
              </div>
            </div>
          </div>
          <ListProgramCard className="mt-5"/>
        </div>
      ),
    },
  ];

  return (
    <Card>
      <ModalAddProgram
        open={open}
        selected={selected}
        setOpen={setOpen}
        setSelected={setSelected}
        columns={columns}
        title="Select Program"
        rows={rows}
      />
      <TabFlex tabs={tabs} />
    </Card>
  );
}

export default AddSchoolView;
