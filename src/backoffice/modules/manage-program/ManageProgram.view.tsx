'use client';
import { TabFlex } from '@/backoffice/components/tabs/tabs';
import { Card } from 'flowbite-react/components/Card';
import React from 'react';
import IICP from './iicp';

const ManageProgramView = () => {
  const tabs = [
    {
      title: 'Course',
      content: <></>,
      active: true,
    },
    {
      title: 'IICP',
      content: <IICP />,
    },
  ];
  return (
    <Card>
      <TabFlex tabs={tabs} />
    </Card>
  );
};

export default ManageProgramView;
