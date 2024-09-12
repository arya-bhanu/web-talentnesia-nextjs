import React, { useState, useEffect } from 'react';
import { IAssignmentChart } from './assignmentChart.type';
import Task from '@/../public/icons/task.svg';

const AssignmentChartView: React.FC<IAssignmentChart> = ({
  onTimePercentage,
  latePercentage,
}) => {
  const [animatedOnTime, setAnimatedOnTime] = useState(0);
  const [animatedLate, setAnimatedLate] = useState(0);

  useEffect(() => {
    const animationDuration = 200;
    const steps = 80;
    const interval = animationDuration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setAnimatedOnTime((prev) => Math.min(onTimePercentage * (currentStep / steps), onTimePercentage));
      setAnimatedLate((prev) => Math.min(latePercentage * (currentStep / steps), latePercentage));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onTimePercentage, latePercentage]);

  const onTimeDegrees = animatedOnTime * 3.6;
  const lateDegrees = animatedLate * 3.6;

  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4 text-center">Assignment</h2>
        <div className="relative w-32 h-32">
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `conic-gradient(
                #F04438 ${onTimeDegrees}deg,
                #d1d5db ${onTimeDegrees}deg ${onTimeDegrees + lateDegrees}deg,
                transparent ${onTimeDegrees + lateDegrees}deg
              )`,
              borderRadius: '50%',
              width: '100%',
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                borderRadius: '50%',
                background: '#fff',
                width: '70%',
                height: '70%',
                top: '15%',
                left: '15%',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Task className="w-12 h-12" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex items-center mb-2">
          <span className="w-3 h-3 bg-[#F04438] rounded-full mr-2"></span>
          <p className="font-lato font-normal text-sm">On Time ({animatedOnTime.toFixed(0)}%)</p>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
          <p className="font-lato font-normal text-sm">Late ({animatedLate.toFixed(0)}%)</p>
        </div>
      </div>
    </div>
  );
};

export default AssignmentChartView;
