"use client";

import React, { useState } from 'react';
import ScheduleView from './Schedule.view';
import { taskDetails } from './schedule.data';

const Schedule: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const tasksPerPage = 2;

  const handleNext = () => {
    if (currentIndex + tasksPerPage < taskDetails.length) {
      setCurrentIndex(currentIndex + tasksPerPage);
    }
  };

  const handlePrevious = () => {
    if (currentIndex - tasksPerPage >= 0) {
      setCurrentIndex(currentIndex - tasksPerPage);
    }
  };

  const visibleTasks = taskDetails.slice(currentIndex, currentIndex + tasksPerPage);

  return (
    <ScheduleView
      totalTasks={taskDetails.length}
      taskDetails={visibleTasks}
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
};

export default Schedule;
