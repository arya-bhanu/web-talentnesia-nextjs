import React from 'react';
import { Select } from 'flowbite-react';
import Image from 'next/image';

interface SelectYearProps {
  id: string;
  onChange: (year: number) => void;
  value: number | null;
  placeholder?: string;
}

export const SelectYear: React.FC<SelectYearProps> = ({
  id,
  onChange,
  value,
  placeholder = 'Select year',
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value, 10);
    onChange(year);
  };

  const CalendarIcon = () => (
    <Image
      src="/img/manage-user/calendar.svg"
      width={25}
      height={24}
      alt="Calendar"
    />
  );

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-poppins">
      <div className="flex items-center bg-gray-50 none text-sm rounded-lg focus:ring-blue-500 pl-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-poppins">
        <CalendarIcon />
        <div className='border-white'>
        <Select
          id={id}
          value={value?.toString() || ''}
          onChange={handleChange}
          className="ml-2 bg-transparent border-white focus:ring-0"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {years.map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </Select>
        </div>
      </div>
    </div>
  );
};
