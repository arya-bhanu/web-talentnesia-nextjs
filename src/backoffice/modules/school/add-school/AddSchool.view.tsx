import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Button, Card } from 'flowbite-react';
import AddSchool from './components/add';
import TableStudent from './components/table-student';
import ProgramCard from './components/program-card';
import ModalAddProgram from '@/backoffice/components/modal-add-program/ModalAddProgram';
import Search from '@/../public/icons/iconamoon_search-bold.svg';
import Add from '@/../public/icons/add.svg';
import { IAddSchoolView } from './addSchool.type';
import { TabFlex } from '../components/tabs/tabs';
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
  const [activeIndex, setActiveIndex] = useState(0);

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
          <h1 className="font-bold text-base text-gray-800 mb-4">
            List Student
          </h1>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search ..."
                  required
                />
              </div>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="flex items-center focus:outline-none text-white bg-[#FFC862] hover:bg-yellow-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            >
              <Add />
              <span className="text-black"> Add Program </span>
            </button>
          </div>
          <ProgramCard className="mt-5" />
        </div>
      ),
    },
  ];

  const handleNextTab = () => {
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, tabs.length - 1));
  };

  const handlePreviousTab = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

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
    <TabFlex
      tabs={tabs}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
    />
    <div className="col-span-2 flex justify-end space-x-4 mt-4">
      <Button
        color="red"
        onClick={handlePreviousTab}
        disabled={activeIndex === 0}
        className="focus:outline-none"
      >
        Previous
      </Button>
      <Button
        color="yellow"
        onClick={handleNextTab}
        disabled={activeIndex === tabs.length - 1}
        className="focus:outline-none"
      >
        Next
      </Button>
    </div>
  </Card>  
  );
}

export default AddSchoolView;
