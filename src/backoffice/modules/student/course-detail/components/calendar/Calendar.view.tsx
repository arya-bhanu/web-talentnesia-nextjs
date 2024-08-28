import React from 'react';
import { scheduleData } from './calendar.data';

import MentoringIcon from '@/../public/icons/mentoring.svg';
import QuizIcon from '@/../public/icons/quiz.svg';

interface CalendarViewProps {
  date: string; 
  hours: string[];
  selectedHour: string | null;
  onPrevDay: () => void;
  onNextDay: () => void;
  onHourClick: (hour: string) => void;
  onToggleHours: () => void;
  showAllHours: boolean;
}

const iconMap: { [key: string]: React.ReactNode } = {
  mentoring: <MentoringIcon className="inline mr-2" />,
  quiz: <QuizIcon className="inline mr-2" />,
};

const CalendarView: React.FC<CalendarViewProps> = ({
  date,
  hours,
  selectedHour,
  onPrevDay,
  onNextDay,
  onToggleHours,
  showAllHours,
}) => {
  const [day, month] = date.split(' ');
  const monthIndex = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1; 
  const dayNumber = parseInt(day, 10);

  const filteredScheduleData = scheduleData.filter(item => item.month === monthIndex && item.day === dayNumber);

  const displayedHours = showAllHours
    ? hours
    : hours.filter((hour) => parseInt(hour.split(':')[0]) <= 14);

  return (
    <div className="flex flex-col items-center py-8">
      <div className="max-w-sm w-full shadow-lg">
        <div className="md:p-8 p-5 bg-white rounded-t">
          <div className="mb-4">
            <h1 className="text-xl font-bold text-gray-800">Calendar</h1>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-gray-800">{date}</span>
            <div className="flex items-center">
              <button
                aria-label="previous day"
                className="focus:text-gray-400 hover:text-gray-400 text-gray-800"
                onClick={onPrevDay}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-left"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
              </button>
              <button
                aria-label="next day"
                className="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800"
                onClick={onNextDay}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-right"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row pt-4">
            <div className="flex flex-col w-full">
              {displayedHours.map((hour) => {
                const scheduleItem = filteredScheduleData.find((item) => item.time === hour);
                return (
                  <div key={hour} className="relative flex items-center mb-4">
                    <span
                      className={`text-sm w-16 py-1 ${
                        selectedHour === hour
                          ? 'text-blue-500 font-bold'
                          : 'text-gray-800'
                      }`}
                    >
                      {hour}
                    </span>
                    <div className="flex-1">
                      <div
                        className={`border-t border-gray-300 ${
                          scheduleItem ? 'hidden' : ''
                        }`}
                        style={{ marginLeft: '2rem' }}
                      />
                    </div>
                    {scheduleItem && (
                      <div
                        className="absolute left-20 bg-green-100 bg-opacity-60 py-1 px-2 text-sm text-gray-800 rounded-lg"
                        style={{ width: 'calc(100% - 4rem)' }}
                      >
                        {iconMap[scheduleItem.icon]}
                        {scheduleItem.event}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button className="text-blue-500" onClick={onToggleHours}>
              {showAllHours ? 'Hide' : 'View All'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
