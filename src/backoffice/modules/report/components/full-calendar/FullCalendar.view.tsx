import React from 'react';
import { FullCalendarProps } from './fullCalendar.type';

const FullCalendarsView: React.FC<FullCalendarProps> = ({
  currentDate,
  changeMonth,
  handleDateClick,
  handleSaveAgenda,
  agenda,
  newAgenda,
  setNewAgenda,
  selectedDate,
  fullCalendarGrid,
  isHoliday,
  isSunday,
  firstDay,
}) => {
  return (
    <div className="flex flex-col">
      <div className="bg-white rounded-lg">
        <div className="">
          <div className="px-4 flex items-center justify-between">
            <span className="text-base font-bold text-gray-800">
              {currentDate.toLocaleString('id-ID', { month: 'long' })}{' '}
              {currentDate.getFullYear()}
            </span>
            <div className="flex items-center">
              <button
                aria-label="FullCalendar backward"
                className="text-gray-800 hover:text-gray-400"
                onClick={() => changeMonth(-1)}
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
                aria-label="FullCalendar forward"
                className="ml-3 text-gray-800 hover:text-gray-400"
                onClick={() => changeMonth(1)}
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
          <div className="pt-12">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-gray-600">Sun</th>
                  <th className="text-gray-900">Mon</th>
                  <th className="text-gray-900">Tue</th>
                  <th className="text-gray-900">Wed</th>
                  <th className="text-gray-900">Thu</th>
                  <th className="text-gray-900">Fri</th>
                  <th className="text-gray-900">Sat</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(
                  { length: Math.ceil(fullCalendarGrid.length / 7) },
                  (_, row) => (
                    <tr key={row}>
                      {fullCalendarGrid
                        .slice(row * 7, row * 7 + 7)
                        .map((day, idx) => {
                          const isSelected =
                            selectedDate && selectedDate.getDate() === day;
                          return (
                            <td
                              key={idx}
                              className={`pt-6 ${day === null ? 'text-gray-400' : ''}`}
                            >
                              <div
                                className={`px-2 py-2 cursor-pointer flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${
                                  day === null
                                    ? 'text-gray-400'
                                    : isSelected
                                      ? 'bg-blue-500 text-white'
                                      : isSunday(day!)
                                        ? 'text-yellow-300 hover:bg-yellow-200'
                                        : isHoliday(day!)
                                          ? 'bg-red-200 text-red-600 hover:bg-red-300'
                                          : 'hover:bg-blue-200 hover:text-black'
                                }`}
                                onClick={() =>
                                  day !== null && handleDateClick(day)
                                }
                              >
                                {day ? (
                                  <p className="text-base dark:text-gray-100 font-medium">
                                    {day}
                                  </p>
                                ) : (
                                  <span className="text-base text-gray-300">
                                    {' '}
                                  </span>
                                )}
                              </div>
                            </td>
                          );
                        })}
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullCalendarsView;
