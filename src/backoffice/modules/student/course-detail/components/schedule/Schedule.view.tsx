import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const ScheduleView: React.FC<ScheduleViewProps> = ({
  totalTasks,
  taskDetails,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const TaskCard = ({ task }: { task: TaskDetail }) => (
    <div className="flex flex-col items-start bg-[#FAFAFA] rounded-2xl p-4 sm:p-6 md:p-8 w-full">
      {' '}
      <div className="text-xs sm:text-sm text-gray-500">{task.title}</div>{' '}
      <div className="text-sm sm:text-base mt-1 md:mt-2 font-semibold text-gray-600">
        {task.mentor}
      </div>{' '}
      <div className="flex items-center mt-4 md:mt-5 space-x-2 sm:space-x-4">
        {' '}
        <div className="text-xs sm:text-sm text-gray-500">
          Due Date: {task.dueDate}
        </div>{' '}
        <button className="inline-flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-full shadow-sm text-gray-700 bg-[#FFC862] hover:bg-[#ffc24f]">
          Submit
        </button>
      </div>
    </div>
  );

  return (
    <section className="px-4 sm:px-6 md:px-4 lg:px-4">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="flex flex-col mb-4 md:mb-0 md:mr-8">
          <h2 className="text-sm sm:text-base md:text-lg font-poppins font-bold tracking-tight text-gray-900">
            Next Schedule
          </h2>
          <p className="text-xs sm:text-sm md:text-sm font-normal text-gray-700">
            {totalTasks} task to do
          </p>
        </div>

        {isMobile ? (
          <Swiper
            spaceBetween={16}
            pagination={{ clickable: true }}
            modules={[Pagination, Navigation]}
            className="w-full"
          >
            {taskDetails.map((task, index) => (
              <SwiperSlide key={index}>
                <TaskCard task={task} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex items-center gap-12">
            <button
              onClick={onPrevious}
              disabled={!canGoPrevious}
              className={`transition-opacity duration-300 flex-shrink-0 ${
                !canGoPrevious ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Image
                src="/icons/btn-left.svg"
                alt="Previous"
                width={40}
                height={40}
                className="text-gray-500"
              />
            </button>
            <div className="flex space-x-6 sm:space-x-12 flex-grow justify-center">
              {taskDetails.map((task, index) => (
                <TaskCard key={index} task={task} />
              ))}
            </div>
            <button
              onClick={onNext}
              disabled={!canGoNext}
              className={`transition-opacity duration-300 flex-shrink-0 ${
                !canGoNext ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Image
                src="/icons/btn-right.svg"
                alt="Next"
                width={40}
                height={40}
                className="text-gray-500"
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScheduleView;
