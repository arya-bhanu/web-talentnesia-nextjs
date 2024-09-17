'use client';

import { TabFlex, TabItem } from '@/backoffice/components/tabs/tabs';
import { IDetailSchoolView, SchoolData } from './detailSchool.type';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import ModalAddProgram from '@/backoffice/components/modal-add-program/ModalAddProgram';
import DetailSchoolPage from './components/detail-school-page';
import ListTableStudent from './components/list-table-student';
import ListProgramCard from './components/list-program-card';
import PermissionGranted from '@/backoffice/components/permission-granted/PermissionGranted';

type TabTypes = 'detailSchool' | 'student' | 'program';

interface DetailSchoolViewProps extends IDetailSchoolView {
  activeAccordion: number;
  setActiveAccordion: Dispatch<SetStateAction<number>>;
  openModalModul: boolean;
  setOpenModalModul: Dispatch<SetStateAction<boolean>>;
  handleSubmitSelectedModul: (e: FormEvent<HTMLFormElement>) => void;
  className?: string;
  schoolData: SchoolData | null;
  fullImageUrl: string;
}

function DetailSchoolView({
  open,
  selected,
  setOpen,
  setSelected,
  columns,
  rows,
  schoolId,
  schoolData,
  fullImageUrl,
}: DetailSchoolViewProps) {
  const [activeTab, setActiveTab] = useState<TabTypes>('detailSchool');

  const tabs: TabItem<TabTypes>[] = [
    {
      title: 'Detail School',
      content: (
        <PermissionGranted role="school.detail.read" roleable>
          <DetailSchoolPage />
        </PermissionGranted>
      ),
      type: 'detailSchool',
      active: activeTab === 'detailSchool',
    },
    {
      title: 'Student',
      content: (
        <PermissionGranted roleable role="school.student.read">
          <ListTableStudent />
        </PermissionGranted>
      ),
      type: 'student',
      active: activeTab === 'student',
    },
    {
      title: 'Program',
      content: (
        <PermissionGranted role="school.program.read" roleable>
          <ListProgramCard />
        </PermissionGranted>
      ),
      type: 'program',
      active: activeTab === 'program',
    },
  ];

  const handleTabChange = (tabType: TabTypes) => {
    setActiveTab(tabType);
  };

  return (
    <>
      <ModalAddProgram
        open={open}
        selected={selected}
        setOpen={setOpen}
        setSelected={setSelected}
        columns={columns}
        title="Select Program"
        rows={rows}
      />
      <TabFlex tabs={tabs} onTabChange={handleTabChange} />
      <div className="mt-4">
        {tabs.find((tab) => tab.type === activeTab)?.content}
      </div>
    </>
  );
}

export default DetailSchoolView;
