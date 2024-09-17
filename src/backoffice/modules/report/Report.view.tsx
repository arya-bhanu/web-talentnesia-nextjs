import React, { useState } from 'react';
import CalendarsEvent from './components/schedule/Schedule';
import { agendaData } from './report.data';
import FullCalendars from './components/full-calendar/FullCalendar';
import ChecklistIcon from '../../../../public/icons/checklist.svg';
import RedBagIcon from '../../../../public/icons/red-bag.svg';
import Card from './components/card-schedule/CardSchedule';
import { format } from 'date-fns';
import TableProgram from './components/table-program/TableProgram';
import { IReportViewProps } from './report.type';
import PermissionGranted from '@/backoffice/components/permission-granted/PermissionGranted';

const ReportView: React.FC<IReportViewProps> = ({
  agendaCount,
  holidayCount,
  currentDate,
  agendaData,
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row bg-[#FFFFFF] rounded-xl">
        <div className="w-full md:w-2/5 border-b-2 md:border-b-0 md:border-r-2">
          <PermissionGranted role="report.agenda.read" roleable>
            <div className="p-4">
              <div className="border-b-2 pb-2">
                <FullCalendars />
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          </PermissionGranted>
        </div>
        <div className="w-full md:w-3/5">
          <div className="flex flex-col sm:flex-row justify-between mb-4 border-b-2">
            <h1 className="text-xl font-bold p-6">{`Today's Agenda`}</h1>
            <p className="text-md text-gray-500 p-6">
              {format(currentDate, 'dd MMMM yyyy')}
            </p>
          </div>
          <div className="p-4 items-center">
            <CalendarsEvent selectedDate={null} agenda={agendaData} />
          </div>
        </div>
      </div>

      <PermissionGranted roleable role="report.programProgress.read">
        <div className="p-4 bg-[#FFFFFF] mt-12 overflow-x-auto rounded-xl">
          <TableProgram />
        </div>
      </PermissionGranted>
    </>
  );
};

export default ReportView;
