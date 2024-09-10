import React from 'react';
import LabelForm from '../label-form';
import Flatpickr from 'react-flatpickr';
import { ITimeInput } from './timeInput.type';
import clsx from 'clsx';
const TimeInputView: React.FC<ITimeInput & { className?: string }> = ({
  setTime,
  time,
  className,
  label,
}) => {
  return (
    <div className={clsx('flex-1 flex flex-col', className)}>
      <LabelForm
        isImportant={label ? label.isImportant : true}
        htmlFor="time"
        className={clsx(label ? 'opacity-100' : 'opacity-0')}
      >
        {label ? label.text : ''}
      </LabelForm>
      <div className="border border-[#D3D7DD] flex items-center gap-1 px-4 rounded-lg mt-1 h-[2.65rem]">
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

        <Flatpickr
          id="time"
          className="w-full !border-none"
          options={{
            enableTime: true,
            noCalendar: true,
            dateFormat: 'H:i',
            time_24hr: true,
            minuteIncrement: 1,
          }}
          value={time}
          onChange={([date]) => {
            setTime(date);
          }}
        />
      </div>
    </div>
  );
};

export default TimeInputView;
