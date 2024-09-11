import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from 'next/image';

interface SelectYearProps {
  id: string;
  onChange: (year: number) => void;
  value: number | null;
  placeholder?: string;
}

export const Component: React.FC<SelectYearProps> = ({ id, onChange, value, placeholder = 'Select year' }) => {
  const [selectedYear, setSelectedYear] = useState<Date | null>(value ? new Date(value, 0) : null);

  const handleYearChange = (date: Date | null) => {
    setSelectedYear(date);
    if (date) {
      onChange(date.getFullYear());
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
    <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-4 flex">
    <CalendarIcon />
    <DatePicker
      id={id}
      selected={selectedYear}
      onChange={handleYearChange}
      showYearPicker
      dateFormat="yyyy"
      yearItemNumber={9}
      placeholderText={'Select Year'}
      className="border border-none ml-0 pl-0 focus:ring-transparent  focus:border-white font-poppins text-sm text-gray-900"
    />
    </div>
  );
};