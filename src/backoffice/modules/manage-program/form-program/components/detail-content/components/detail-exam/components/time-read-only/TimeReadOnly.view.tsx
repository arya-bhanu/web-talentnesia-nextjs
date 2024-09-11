import React from 'react';
import { TimeReadOnlyProps } from './timeReadOnly.type';
import clsx from 'clsx';

const TimeReadOnlyView: React.FC<TimeReadOnlyProps> = ({
  time,
  label,
  className,
}) => {
  return (
    <div className={clsx('flex-1 flex flex-col' + className)}>
      <div className="flex items-center gap-1 px-4 rounded-lg h-[2.65rem]">
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

        {/* Time Display */}
        <div className="w-full !border-none p-2">
          {time instanceof Date
            ? time.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })
            : ''}
        </div>
      </div>
    </div>
  );
};

export default TimeReadOnlyView;
