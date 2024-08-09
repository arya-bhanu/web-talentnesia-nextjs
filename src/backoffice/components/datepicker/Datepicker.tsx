import React, { useState, useEffect } from 'react';
import { Datepicker as FlowbiteDatepicker } from "flowbite-react";
import Image from 'next/image';

interface DatepickerProps {
  onReset?: (resetFunction: () => void) => void;
}

const CalendarIcon = () => (
  <Image
    src="/img/manage-user/calendar.svg"
    width={25}
    height={24}
    alt="Calendar"
  />
);

export function Component({ onReset }: DatepickerProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    if (onReset) {
      onReset(() => setSelectedDate(""));
    }
  }, [onReset]);

  return (
    <FlowbiteDatepicker
      icon={CalendarIcon}
      value={selectedDate}
      onSelectedDateChanged={(date) => setSelectedDate(date ? date.toDateString() : "")}
      placeholder="Select Date"
    />
  );
}
