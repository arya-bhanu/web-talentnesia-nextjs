import React from 'react';
import { Datepicker } from 'flowbite-react';
import Image from 'next/image';

interface DatepickerProps {
  id: string;
  onChange: (date: Date | null) => void;
  value: Date | null;
  placeholder?: string;
}

export const Component: React.FC<DatepickerProps> = ({ id, onChange, value, placeholder = 'Select date' }) => {
  const handleChange = (date: Date) => {
    onChange(date);
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
      onSelectedDateChanged={handleChange}
      value={value ? value.toISOString().split('T')[0] : ''}
      placeholder={placeholder}
    />
  );
};
