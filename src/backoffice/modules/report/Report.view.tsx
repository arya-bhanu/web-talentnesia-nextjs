'use client';

import React, { useState } from 'react';
import CalendarsEvent from './components/schedule/Schedule';
import { agendaData } from './report.data';
import FullCalendars from './components/full-calendar/FullCalendar';
import ChecklistIcon from '../../../../public/icons/checklist.svg';
import RedBagIcon from '../../../../public/icons/red-bag.svg';
import Card from './components/card-schedule/CardSchedule';
import { format } from 'date-fns';

const ReportView: React.FC = () => {
  const [agendaCount] = useState<number>(12);
  const [holidayCount] = useState<number>(3);
  const currentDate = new Date();

  return (
    <div className="flex bg-[#FFFFFF] rounded-xl">
      <div className="w-[40%] border-r-2">
        <div className="p-4">
          <div className="border-b-2 pb-2">
          <FullCalendars />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
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
        <div className="flex justify-between mb-4 border-b-2">
          <h1 className="text-xl font-bold p-6">Today's Agenda</h1>
          <p className="text-md text-gray-500 p-6">
            {format(currentDate, 'dd MMMM yyyy')}
          </p>
        </div>
        <div className="p-4 items-center">
          <CalendarsEvent selectedDate={null} agenda={agendaData} />
        </div>
      </div>
    </div>
  );
};

export default ReportView;
