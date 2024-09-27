import React, { useState, useEffect } from 'react';
import { IAttendanceChart } from './attendanceChart.type';
import Task from '@/../public/icons/task.svg';
import arrowRight from '@/../public/icons/task.svg';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

const AttendanceChartView: React.FC<IAttendanceChart> = ({
  present,
  absent,
}) => {
  const [animatedPresent, setAnimatedPresent] = useState(0);
  const [animatedAbsent, setAnimatedAbsent] = useState(0);

  useEffect(() => {
    const animationDuration = 200;
    const steps = 80;
    const interval = animationDuration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setAnimatedPresent((prev) =>
        Math.min(present * (currentStep / steps), present),
      );
      setAnimatedAbsent((prev) =>
        Math.min(absent * (currentStep / steps), absent),
      );

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [present, absent]);

  const presentDegrees = animatedPresent * 3.6;
  const absentDegrees = animatedAbsent * 3.6;

  return (
    <div
      className={clsx(`flex flex-col bg-[#FFFFFF] p-4 rounded-md`)}
    >
      <h2 className="text-xl font-bold mb-4">Attendance</h2>
      <div className="flex space-x-4">
        <div className="relative w-24 h-24">
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `conic-gradient(
                #FFC862 ${presentDegrees}deg,
                #d1d5db ${presentDegrees}deg ${presentDegrees + absentDegrees}deg,
                transparent ${presentDegrees + absentDegrees}deg
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
            <span className="w-3 h-3 bg-[#FFC862] rounded-full mr-2"></span>
            <p className="font-lato font-normal text-sm">
              Present ({animatedPresent.toFixed(0)}%)
            </p>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
            <p className="font-lato font-normal text-sm">
              Absent ({animatedAbsent.toFixed(0)}%)
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4 items-center">
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

export default AttendanceChartView;
