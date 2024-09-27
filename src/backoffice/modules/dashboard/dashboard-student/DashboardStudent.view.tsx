'use client';
import React from 'react';
import Image from 'next/image';
import {
  agendaData,
  classData,
  iicpData,
  studentData,
} from './dashboardStudent.data';
import Table from './components/table/Table';
import CalendarsEvent from './components/schedule/schedule';
import Calendars from '../dashboard-operator/components/calendar/Calendar';

const DashboardStudentview = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const onDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        <div className="bg-[#FFF4DC] overflow-hidden shadow sm:rounded-lg flex p-6 relative h-32">
          <div className="absolute top-4 left-4 flex items-center justify-center bg-[#F79009] rounded-full w-12 h-12 ml-2.5">
            <Image
              src={studentData.image}
              alt="Student Image"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
          <div className="mt-12 flex flex-col">
            <div className="flex items-center">
              <div className="text-xl leading-9 font-bold text-gray-900">
                {studentData.activeStudent}
              </div>
              <div className="text-md leading-5 font-medium text-gray-900 pl-2">
                Active Student
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#D8F1D9] overflow-hidden shadow sm:rounded-lg flex p-6 relative h-32">
          <div className="absolute top-4 left-4 flex items-center justify-center bg-[#15B79E] rounded-full w-12 h-12 ml-2.5">
            <Image
              src={iicpData.image}
              alt="IICP Image"
              width={32}
              height={32}
              className="rounded-lg"
            />
          </div>
          <div className="mt-12 flex flex-col">
            <div className="flex items-center">
              <div className="text-xl leading-9 font-bold text-gray-900">
                {iicpData.IICP}
              </div>
              <div className="text-md leading-5 font-medium text-gray-900 pl-2">
                IICP
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#F4E8FF] overflow-hidden shadow sm:rounded-lg flex p-6 relative h-32">
          <div className="absolute top-4 left-4 flex items-center justify-center bg-[#7A5AF8] rounded-full w-12 h-12 ml-2.5">
            <Image
              src={classData.image}
              alt="Classroom Image"
              width={32}
              height={32}
              className="rounded-lg"
            />
          </div>
          <div className="mt-12 flex flex-col">
            <div className="flex items-center">
              <div className="text-xl leading-9 font-bold text-gray-900">
                {classData.classRoom}
              </div>
              <div className="text-md leading-5 font-medium text-gray-900 pl-2">
                Classroom
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 flex flex-col gap-4 p-4 lg:border-r-2">
            <div className="border-b-2 pb-3">
              <Calendars
                onDateChange={onDateChange}
                selectedDate={selectedDate || new Date()}
              />
            </div>
            <div className="bg-white mt-4 rounded-lg mb-2 w-full">
              <div className="bg-white overflow-hidden shadow sm:rounded-lg flex p-6 relative">
                <div className="absolute top-4 left-4 flex items-center justify-center bg-[#E7F8F0] rounded-full w-12 h-12 ml-2.5">
                  <Image
                    src={agendaData.image}
                    alt="Agenda Image"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                </div>
                <div className="mt-11 flex flex-col">
                  <div className="text-md leading-5 font-medium text-gray-600 pt-4">
                    Agenda
                  </div>
                  <div className="flex items-start pt-2">
                    <div className="text-xl leading-9 font-bold text-gray-900">
                      {agendaData.agenda}
                    </div>
                    <div className="text-md leading-5 font-medium text-gray-900 pl-2 pt-2">
                      Scheduled
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 flex flex-col p-4">
            <div className="relative p-4">
              <CalendarsEvent selectedDate={selectedDate} agenda={agendaData} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Table />
      </div>
    </div>
  );
};

export default DashboardStudentview;
