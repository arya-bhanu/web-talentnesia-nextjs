import React, { useEffect } from 'react';
import { Datepicker as FlowbiteDatepicker } from 'flowbite-react';
import Image from 'next/image';

interface DatepickerProps {
  onReset?: (resetFunction: () => void) => void;
  selectedDate?: Date | null;
  setSelectedDate?: (arg: Date | null) => void;
}

const CalendarIcon = () => (
  <Image
    src="/img/manage-user/calendar.svg"
    width={25}
    height={24}
    alt="Calendar"
  />
);

export function Component({
  onReset,
  selectedDate,
  setSelectedDate,
}: DatepickerProps) {
  useEffect(() => {
    if (onReset && setSelectedDate) {
      onReset(() => setSelectedDate(null));
    }
  }, [onReset, setSelectedDate]);

  return (
    <FlowbiteDatepicker
      icon={CalendarIcon}
      value={selectedDate?.toISOString()}
      onSelectedDateChanged={(date) => {
        if (setSelectedDate) {
          setSelectedDate(date);
        }
      }}
      placeholder="Select Date"
    />
  );
}
