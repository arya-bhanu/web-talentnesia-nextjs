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
import { Spinner } from 'flowbite-react';

interface CourseDetailViewProps {
  courseId: string;
  courseDetailData: APIResponseCourseDetail | null;
  loading: boolean;
}

const CourseDetailView: React.FC<CourseDetailViewProps> = ({
  courseId,
  courseDetailData,
  loading,
}) => {
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

  const {
    course,
    mentors,
    joinGroup,
    attendance,
    assignment,
    certificates,
    calendar,
    historyExam,
  } = courseDetailData.data;

  return (
    <div className="p-4">
      <ModulProgress progress={course.progress} />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <div className="flex-1">
            <AssignmentChart data={assignment} />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex-1">
            <AttendanceChart data={attendance} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-4 md:flex-row gap-6">
        <div className="grid col-span-1 bg-[#FFFFFF] rounded-xl">
          <Calendar calendarData={calendar} />
        </div>
        <div className="col-span-3 bg-[#FFFFFF] rounded-xl">
          <HistoriExam
            historyExam={historyExam.map((exam, index) => ({
              ...exam,
              no: index + 1,
              examName: exam.name,
              submitDate: exam.endDate,
            }))}
          />
        </div>
      </div>
      <div className="bg-[#FFFFFF] rounded-xl mt-6 p-4">
        <Schedule />
        <div className="mt-10 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-3/4">
            <Modul certificates={certificates} course={course} />
          </div>
          <div className="w-full md:w-1/3 space-y-12">
            {joinGroup.link && joinGroup.link !== '' && (
              <JoinDiscord data={joinGroup} />
            )}
            <Mentor mentors={mentors} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailView;
