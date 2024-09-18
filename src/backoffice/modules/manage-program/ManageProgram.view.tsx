'use client';
import React from 'react';
import { Card } from 'flowbite-react';
import { TabFlex, TabItem } from '@/backoffice/components/tabs/tabs';
import IICP from './iicp';
import Course from './course';
import { useTabStoreManageProgram } from './manageProgramStore';
import { ProgramTabs } from './manageProgram.type';
import { ListProgramView } from './list-program/ListProgram.view';
import { decodeToken } from '@/lib/tokenDecoder';
import PermissionGranted from '@/backoffice/components/permission-granted/PermissionGranted';

const ManageProgramView: React.FC = () => {
  const activeTab = useTabStoreManageProgram((state) => state.activeTab);
  const setActiveTab = useTabStoreManageProgram((state) => state.setActiveTab);

  const handleTabChange = (tabType: ProgramTabs[keyof ProgramTabs]) => {
    setActiveTab(tabType);
  };

  const tabs: TabItem<ProgramTabs[keyof ProgramTabs]>[] = [
    {
      title: 'Course',
      content: <Course />,
      active: activeTab === 'course',
      type: 'course',
    },
    {
      title: 'IICP',
      content: (
        <PermissionGranted roleable role="manage-program.iicp.read">
          <IICP />
        </PermissionGranted>
      ),
      active: activeTab === 'iicp',
      type: 'iicp',
    },
  ];

  const decodedToken = decodeToken();
  const isAdmin = decodedToken?.role === 1;

  return (
    <>
      {!isAdmin && <ListProgramView />}
      {isAdmin && (
        <Card>
          <TabFlex<ProgramTabs[keyof ProgramTabs]>
            tabs={tabs}
            onTabChange={handleTabChange}
          />
          <div className="mt-4">
            {activeTab === 'course' && <Course />}
            {activeTab === 'iicp' && <IICP />}
          </div>
        </Card>
      )}
    </>

  );
};

export default ManageProgramView;
