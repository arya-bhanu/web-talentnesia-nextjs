'use client';

import { Button, Label, TextInput, Radio, Card, Select } from 'flowbite-react';
import { TabFlex } from '@/backoffice/components/tabs/tabs';
import { DropFile } from '@/backoffice/components/drop-files-input/dropFilesInput'; 
import LabelForm from '@/backoffice/components/label-form';
import { IAddSchoolView } from './addSchool.type';
import Search from '@/../public/icons/iconamoon_search-bold.svg';
import Add from '@/../public/icons/add.svg';
import { IAccordionPanelDraggable } from '@/backoffice/modules/manage-program/components/accordion-panel-draggable/accordionPanelDraggable.type';
import { Dispatch, FormEvent, SetStateAction } from 'react';
import TableStudent from './components/table-student';
import ProgramCard from './components/program-card';
import ListDraggable from './components/list-draggablez';
import ModalAddProgram from '@/backoffice/components/modal-add-program/ModalAddProgram';
import AddSchool from './components/add';

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
      title: 'Detail',
      content: (
        <div>
        <AddSchool />
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
          <TableStudent className="mt-5" />
          <div className="flex justify-end space-x-4 mt-5">
            <Button color="red">Previous</Button>
            <Button color="yellow">Next</Button>
          </div>
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
            <button
              onClick={() => setOpen(true)}
              className="flex items-center focus:outline-none text-white bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            >
              <Add />
              <span className="text-black"> Add Program </span>
            </button>
          </div>
          <ProgramCard className="mt-5"/>
          <div className="flex justify-end space-x-4 mt-5">
            <Button color="red">Previous</Button>
            <Button color="yellow">Next</Button>
          </div>
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
