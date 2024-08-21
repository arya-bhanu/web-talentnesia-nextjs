'use client'

import React, { useState } from 'react';
import CalendarsEvent from './components/schedule/Schedule';
import { agendaData } from './report.data';
import FullCalendars from './components/full-calendar/FullCalendar';
import ChecklistIcon from '../../../../public/icons/checklist.svg';
import RedBagIcon from '../../../../public/icons/red-bag.svg';
import Card from './components/card-schedule/CardSchedule';

const ReportView: React.FC = () => {
  const [agendaCount] = useState<number>(12);
  const [holidayCount] = useState<number>(3);

  return (
    <div className="flex">
      <div className="w-[40%] border-r-2">
        <div className="">
          <FullCalendars />
          <div className="mt-4 grid grid-cols-2 gap-4 w-[95%]">
            <Card
              icon={<ChecklistIcon className="text-green-500" />}
              bgColor="bg-green-100"
              title="Agenda"
              count={agendaCount}
            />
            <Card
              icon={<RedBagIcon className="text-red-500" />}
              bgColor="bg-red-100"
              title="Holiday"
              count={holidayCount}
            />
          </div>
        </div>
      </div>

      <div className="w-[60%]">
        <CalendarsEvent selectedDate={null} agenda={agendaData} />
      </div>
    </div>
  );
};

export default ReportView;