import React from 'react';
import AssignmentChart from './components/assignment-chart';
import AttendanceChart from './components/attendance-chart';
import Calendar from './components/calendar';
import HistoriExam from './components/histori-exam';
import Schedule from './components/schedule';
import Modul from './components/modul';
import ModulProgress from './components/modul-progres';
import JoinDiscord from './components/join-discord/JoinDiscord';
import Statistic from './components/statistic';
import Mentor from './components/list-mentor';
import { APIResponseCourseDetail } from './courseDetail.type';
import { Spinner } from "flowbite-react";

interface CourseDetailViewProps {
  courseId: string;
  courseDetailData: APIResponseCourseDetail | null;
  loading: boolean;
}

const CourseDetailView: React.FC<CourseDetailViewProps> = ({ courseId, courseDetailData, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(80vh-200px)]">
        <Spinner aria-label="Loading" size="xl" />
      </div>
    );
  }

  if (!courseDetailData) {
    return <div>No course data available</div>;
  }

  const { course, mentors, joinGroup, attendance, assignment, certificates, calendar } = courseDetailData.data;

  return (
    <div className="p-4">
      <ModulProgress progress={course.progress} />
      <div className="mt-10 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <AssignmentChart data={assignment} />
        </div>
        <div className="flex-1">
          <AttendanceChart data={attendance} />
        </div>
      </div>
      <div className="mt-10 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
        <Calendar calendarData={calendar} />
        </div>
        <div className="flex-1">
          <HistoriExam />
        </div>
      </div>
      <Schedule />
      <div className="mt-10 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-3/4">
          <Modul certificates={certificates} course={course}/>
        </div>
        <div className="w-full md:w-1/3 space-y-12">
          {joinGroup.link && joinGroup.link !== "" && (
            <JoinDiscord data={joinGroup} />
          )}
          <Mentor mentors={mentors} />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailView;
