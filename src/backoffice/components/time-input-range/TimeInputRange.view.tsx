import React from 'react';
import Flatpickr from 'react-flatpickr';
import LabelForm from '../label-form';
import clsx from 'clsx';
import { ITimeInputRange } from './timeInputRange.type';
const TimeInputRangeView: React.FC<ITimeInputRange> = ({
  label,
  className,
  setTimeEnd,
  setTimeStart,
  timeEnd,
  timeStart,
}) => {
  return (
    <div className={clsx('flex-1 flex flex-col w-full', className)}>
      <LabelForm
        isImportant={label ? label.isImportant : true}
        htmlFor="time"
        className={clsx(label ? 'opacity-100' : 'opacity-0')}
      >
        {label ? label.text : ''}
      </LabelForm>
      <div className="border border-[#D3D7DD] flex items-center gap-1 py-2 px-4 rounded-lg mt-1 flex-1">
        <svg
          width="30"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.25 13.25C21.25 18.08 17.33 22 12.5 22C7.67 22 3.75 18.08 3.75 13.25C3.75 8.42 7.67 4.5 12.5 4.5C17.33 4.5 21.25 8.42 21.25 13.25Z"
            stroke="#989FAD"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.5 8V13"
            stroke="#989FAD"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 2H15.5"
            stroke="#989FAD"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="flex items-center gap-3">
          <Flatpickr
            id="time"
            className="max-w-[3rem] !border-none"
            options={{
              enableTime: true,
              noCalendar: true,
              dateFormat: 'H:i',
              time_24hr: true,
              minuteIncrement: 1,
            }}
            value={timeStart}
            onChange={([date]) => {
              setTimeStart(date);
            }}
          />
          <span>-</span>
          <Flatpickr
            id="time"
            className="max-w-[3rem] !border-none"
            options={{
              enableTime: true,
              noCalendar: true,
              dateFormat: 'H:i',
              time_24hr: true,
              minuteIncrement: 1,
            }}
            value={timeEnd}
            onChange={([date]) => {
              setTimeEnd(date);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TimeInputRangeView;
