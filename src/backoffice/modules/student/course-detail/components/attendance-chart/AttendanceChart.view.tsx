import React from 'react';
import { IAttendanceChart } from './attendanceChart.type';
import Task from '@/../public/icons/task.svg';

const AttendanceChartView: React.FC<IAttendanceChart> = ({
  present,
  absent,
}) => {
  const onTimeDegrees = present * 3.6;
  const lateDegrees = absent * 3.6;

  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4 text-center">Attendance</h2>
        <div className="relative w-32 h-32">
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `conic-gradient(
               #FFC862 ${onTimeDegrees}deg,
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
          <span className="w-3 h-3 bg-[#FFC862] rounded-full mr-2"></span>
          <p className="font-lato font-normal text-sm">Present ({present}%)</p>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
          <p className="font-lato font-normal text-sm">Absent ({absent}%)</p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChartView;
