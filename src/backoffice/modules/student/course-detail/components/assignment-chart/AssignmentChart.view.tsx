import React, { useState, useEffect } from 'react';
import { IAssignmentChart } from './assignmentChart.type';
import Task from '@/../public/icons/task.svg';
import arrowRight from '@/../public/icons/arrow-up.svg';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

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
      setAnimatedOnTime((prev) =>
        Math.min(onTimePercentage * (currentStep / steps), onTimePercentage),
      );
      setAnimatedLate((prev) =>
        Math.min(latePercentage * (currentStep / steps), latePercentage),
      );

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onTimePercentage, latePercentage]);

  const onTimeDegrees = animatedOnTime * 3.6;
  const lateDegrees = animatedLate * 3.6;

  return (
    <div className={clsx(`bg-[#FFFFFF] shadow-md p-4 rounded-md`)}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Assignment</h2>
      </div>

      <div className="flex space-x-4">
        <div className="relative w-24 h-24">
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
            }}
          >
            <div
              className="absolute inset-0 m-auto"
              style={{
                borderRadius: '50%',
                background: '#fff',
                width: '70%',
                height: '70%',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Task className="w-10 h-10 z-10" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center mb-2">
            <span className="w-3 h-3 bg-[#F04438] rounded-full mr-2"></span>
            <p className="font-lato font-normal text-sm">
              On Time ({animatedOnTime.toFixed(0)}%)
            </p>
          </div>
          <div className="flex items-center ">
            <span className="w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
            <p className="font-lato font-normal text-sm">
              Late ({animatedLate.toFixed(0)}%)
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Link
          href="#"
          className="text-[#219EBC] hover:underline text-sm font-lato flex items-center"
        >
          See Details
          <Image
            src="/icons/arrow-right.svg"
            alt="Unavailable"
            width={12}
            height={12}
            className="ml-0.5 transform rotate-[270deg] text-[#219EBC] items-center"
            style={{
              filter: `brightness(0) saturate(100%) invert(50%) sepia(70%) saturate(510%) hue-rotate(144deg) brightness(91%) contrast(89%)`,
            }}
          />
        </Link>
      </div>
    </div>
  );
};

export default AssignmentChartView;
