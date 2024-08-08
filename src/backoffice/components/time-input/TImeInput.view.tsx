import React from 'react';
import LabelForm from '../label-form';
import Flatpickr from 'react-flatpickr';
import Timer from '@/../public/icons/timer.svg';
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
      <div className="border border-[#D3D7DD] flex items-center gap-2 px-4 rounded-lg mt-1 flex-1">
        <Timer />
        <Flatpickr
          id="time"
          className="h-full w-full !border-none"
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
