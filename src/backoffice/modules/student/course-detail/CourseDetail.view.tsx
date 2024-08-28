import React from 'react';
import AssignmentChart from './components/assignment-chart';
import AttendanceChart from './components/attendance-chart';
import Calendar from './components/calendar';
import HistoriExam from './components/histori-exam';
import Schedule from './components/schedule';
import Modul from './components/modul';
import ModulProgress from './components/modul-progres';
import JoinDiscord from './components/join-discord/JoinDiscord';

const CourseDetailView: React.FC = () => (
  <div className="p-4">
    <ModulProgress progress={50} />
    <div className="mt-10 flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <AssignmentChart />
      </div>
      <div className="flex-1">
        <AttendanceChart />
      </div>
    </div>
    <div className="mt-10 flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <Calendar />
      </div>
      <div className="flex-1">
        <HistoriExam />
      </div>
    </div>
    <Schedule />
    <div className="mt-10 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-3/4">
        <Modul />
      </div>
      <div className="w-full md:w-1/3">
        <JoinDiscord />
      </div>
    </div>
  </div>
);

export default CourseDetailView;
