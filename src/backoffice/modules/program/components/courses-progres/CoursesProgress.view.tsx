import React from 'react';
import { ICoursesProgress } from './coursesProgress.type';

const CoursesProgressView: React.FC<ICoursesProgress> = ({
  title,
  progress,
  className,
  startDate,
  endDate,
  completedSessions,
  totalSessions,
}) => {
  return (
    <div className={className}>
      <div className="flex flex-col">
        {title && <h2 className="font-semibold text-lg font-poppins mb-2">{title}</h2>}
        <p className="font-lato font-normal text-sm mb-2">
          {startDate} - {endDate}
        </p>
      </div>
      <div className="relative mt-2 h-3 w-full bg-[rgba(94,171,190,0.07)] rounded-full">
        <div
          style={{ width: `${progress}%` }}
          className={`absolute rounded-full h-3 bg-[#219EBC]`}
        ></div>
      </div>
      <div className="flex justify-between mt-2">
        <p className="font-lato font-normal text-sm">{progress}% Progress</p>
        <p className="font-lato font-normal text-sm">{completedSessions}/{totalSessions} Sessions</p>
      </div>
    </div>
  );
};

export default CoursesProgressView;
