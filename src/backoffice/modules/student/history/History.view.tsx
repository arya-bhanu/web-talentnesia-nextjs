import React from 'react';
import { Card } from 'flowbite-react';
import { TabFlex } from '@/backoffice/components/tabs/tabs';
import { IHistoryView } from './history.type';
import Attendance from './components/attendance';
import Assigement from './components/assignment/Assignment';

const HistoryView = ({ activeTab, setActiveTab }: IHistoryView) => {
  const tabs = [
    {
      title: 'Attendance',
      content: <div>
        <Attendance />
      </div>,
    },
    {
      title: 'Assigement',
      content: <div>
        <Assigement />
      </div>,
    },
  ];

  return (
    <Card>
      <TabFlex tabs={tabs} />
    </Card>
  );
};

export default HistoryView;
