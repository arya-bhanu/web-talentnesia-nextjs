"use client";

import React, { useState, useCallback } from 'react';
import ScheduleView from './Schedule.view';
import { taskDetails } from './schedule.data';

const Schedule: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const tasksPerPage = 2;

  const canGoNext = useCallback(() => {
    return currentIndex + tasksPerPage < taskDetails.length;
  }, [currentIndex]);

  const canGoPrevious = useCallback(() => {
    return currentIndex > 0;
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (canGoNext()) {
      setCurrentIndex(prevIndex => prevIndex + tasksPerPage);
    }
  }, [canGoNext]);

  const handlePrevious = useCallback(() => {
    if (canGoPrevious()) {
      setCurrentIndex(prevIndex => prevIndex - tasksPerPage);
    }
  }, [canGoPrevious]);

  const visibleTasks = taskDetails.slice(currentIndex, currentIndex + tasksPerPage);

  return (
    <ScheduleView
      totalTasks={taskDetails.length}
      taskDetails={visibleTasks}
      onNext={handleNext}
      onPrevious={handlePrevious}
      canGoNext={canGoNext()}
      canGoPrevious={canGoPrevious()}
    />
  );
};

export default Schedule;