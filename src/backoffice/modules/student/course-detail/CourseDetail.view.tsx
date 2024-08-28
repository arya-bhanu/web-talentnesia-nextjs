import React from 'react';
import ModulProgress from './components/modul-progres';
import AssignmentChart from './components/assignment-chart';
import AttendanceChart from './components/attendance-chart';
import Calendar from './components/calendar';
import HistoriExam from './components/histori-exam';

const CourseDetailView: React.FC = () => {
    return (
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
        </div>
    );
};

export default CourseDetailView;
