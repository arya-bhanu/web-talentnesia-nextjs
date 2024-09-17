'use client';
import { Card } from 'flowbite-react';
import { TabFlex, TabItem } from '@/backoffice/components/tabs/tabs';
import { FormProgramTabs, IFormProgram } from './formProgram.type';
import TableStudents from './components/table-students';
import ModalSelect from '@/backoffice/components/modal-select/ModalSelect';
import { IAccordionPanelDraggable } from '@/backoffice/modules/manage-program/components/accordion-panel-draggable/accordionPanelDraggable.type';
import { Dispatch, FormEvent, SetStateAction, useEffect } from 'react';
import FormCourse from './components/form-course';
import FormDetail from './components/form-detail/FormDetail';
import { useTabStoreFormProgram } from './formProgramStore';
import { decodeToken } from '@/lib/tokenDecoder';

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

  const decodedToken = decodeToken();
  const isAdmin = decodedToken?.role === 1;

  useEffect(() => {
    if (!isAdmin && activeTab === 'detail') {
      setActiveTab('course');
    }
  }, [isAdmin, activeTab]);

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
            content: <TableStudents setOpenModalBrowser={setOpen}/>,
            active: activeTab === 'student',
            type: 'student' as const,
          },
        ]
      : []),
  ];

  const filteredTabs = isAdmin ? tabs : tabs.filter(tab => tab.type !== 'detail');

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
        tabs={filteredTabs}
        onTabChange={handleTabChange}
      />
      {(isAdmin || activeTab !== 'detail') && (
        <>
          {activeTab === 'detail' && <FormDetail />}
          {programId && (
            <>
              {activeTab === 'course' && <FormCourse />}
              {activeTab === 'student' && <TableStudents setOpenModalBrowser={setOpen}/>}
            </>
          )}
        </>
      )}
    </Card>
  );
}

export default FormProgramView;
