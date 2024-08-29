import React from 'react';
import LeftIcon from '@/../public/icons/btn-left.svg';
import RightIcon from '@/../public/icons/btn-right.svg';

interface TaskDetail {
  title: string;
  mentor: string;
  dueDate: string;
}

interface ScheduleViewProps {
  totalTasks: number;
  taskDetails: TaskDetail[];
  onNext: () => void;
  onPrevious: () => void;
}

const ScheduleView: React.FC<ScheduleViewProps> = ({
  totalTasks,
  taskDetails,
  onNext,
  onPrevious,
}) => {
  return (
    <section className="border-indigo-50 rounded-md shadow-sm">
      <div className="max-w-7xl px-4 sm:px-6 md:px-4 mx-auto lg:px-4 py-12 sm:py-24">
        <div className="flex items-center justify-between">
          <div className="flex flex-grow items-center space-x-4">
            <div className="flex flex-col flex-grow">
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-gray-900">
                Next Schedule
              </h2>
              <div className="flex items-center">
                <p className="text-sm sm:text-base font-normal text-gray-700 mr-4">
                  {totalTasks} Total Task
                </p>
              </div>
            </div>

            <div className="flex flex-grow items-start space-x-16">
              <div className="-mr-8 mt-10">
                <LeftIcon
                  className="text-gray-500 cursor-pointer"
                  onClick={onPrevious}
                />
              </div>
              {taskDetails.map((task, index) => (
                <div key={index} className="flex flex-col items-start">
                  <div className="text-sm text-gray-500">{task.title}</div>
                  <div className="text-base mt-2 font-semibold text-gray-600">
                    {task.mentor}
                  </div>
                  <div className="flex items-center mt-5 space-x-4">
                    <div className="text-sm text-gray-500">
                      Due Date: {task.dueDate}
                    </div>
                    <button className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-gray-700 bg-[#FFC862] hover:bg-[#ffc24f]">
                      Submit
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-10">
                <RightIcon
                  className="text-gray-500 cursor-pointer"
                  onClick={onNext}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleView;
