'use client';
import { Card } from 'flowbite-react';
import { TabFlex, TabItem } from '@/backoffice/components/tabs/tabs';
import { FormProgramTabs, IFormProgram } from './formProgram.type';
import Search from '@/../public/icons/iconamoon_search-bold.svg';

import Add from '@/../public/icons/add.svg';
import TableStudents from './components/table-students';
import ModalSelect from '@/backoffice/components/modal-select/ModalSelect';
import { IAccordionPanelDraggable } from '@/backoffice/modules/manage-program/components/accordion-panel-draggable/accordionPanelDraggable.type';
import { Dispatch, FormEvent, SetStateAction } from 'react';
import FormCourse from './components/form-course';
import FormDetail from './components/form-detail/FormDetail';
import { useTabStoreFormProgram } from './formProgramStore';

function FormProgramView({
  open,
  selected,
  setOpen,
  setSelected,
  programId,
}: IFormProgram &
  Pick<IAccordionPanelDraggable, 'activeAccordion' | 'setActiveAccordion'> & {
    openModalModul: boolean;
    setOpenModalModul: Dispatch<SetStateAction<boolean>>;
    handleSubmitSelectedModul: (e: FormEvent<HTMLFormElement>) => void;
    programId?: string | null;
  }) {
  const activeTab = useTabStoreFormProgram((state) => state.activeTab);
  const setActiveTab = useTabStoreFormProgram((state) => state.setActiveTab);
  const handleTabChange = (tabType: FormProgramTabs[keyof FormProgramTabs]) => {
    setActiveTab(tabType);
  };

  const tabs: TabItem<FormProgramTabs[keyof FormProgramTabs]>[] = [
    {
      title: 'Detail',
      content: <FormDetail />,
      active: activeTab === 'detail',
      type: 'detail',
    },
    ...(programId
      ? [
          {
            title: 'Course',
            content: <FormCourse />,
            active: activeTab === 'course',
            type: 'course' as const,
          },
          {
            title: 'Student',
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
                    <span className="text-black"> Browse All</span>
                  </button>
                </div>
                <TableStudents className="mt-5" />
              </div>
            ),
            active: activeTab === 'student',
            type: 'student' as const,
          },
        ]
      : []),
  ];

  return (
    <Card>
      <ModalSelect
        open={open}
        selected={selected}
        setOpen={setOpen}
        setSelected={setSelected}
        title="Select Student"
        columns={[]}
        rows={[]}
      />
      <TabFlex<FormProgramTabs[keyof FormProgramTabs]>
        tabs={tabs}
        onTabChange={handleTabChange}
      />
      {activeTab === 'detail' && <FormDetail />}
      {programId && (
        <>
          {activeTab === 'course' && <FormCourse />}
          {activeTab === 'student' && (
            <>
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
                    <span className="text-black"> Browse All</span>
                  </button>
                </div>
                <TableStudents className="mt-5" />
              </div>
            </>
          )}
        </>
      )}
    </Card>
  );
}

export default FormProgramView;
