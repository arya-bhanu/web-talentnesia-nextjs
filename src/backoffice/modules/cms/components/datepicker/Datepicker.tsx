import React from 'react';
import { Datepicker } from 'flowbite-react';
import Image from 'next/image';
import { addDays } from 'date-fns';

interface DatepickerProps {
  id: string;
  onChange: (date: Date | null) => void;
  value: Date | null;
  placeholder?: string;
}

export const Component: React.FC<DatepickerProps> = ({
  id,
  onChange,
  value,
  placeholder = 'Select date',
}) => {
  const handleChange = (date: Date | null) => {
    if (date) {
      const nextDay = addDays(date, 1);
      onChange(nextDay);
    } else {
      onChange(null);
    }
  };

  const CalendarIcon = () => (
    <Image
      src="/img/manage-user/calendar.svg"
      width={25}
      height={24}
      alt="Calendar"
    />
  );

  return (
    <Datepicker
      id={id}
      icon={CalendarIcon}
      onChange={handleChange}
      value={value}
      defaultValue={value || undefined}
      placeholder={placeholder}
    />
  );
};
