import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { SearchBarCourseViewProps } from './searchBarCourse.types';

const SearchBarCourseView: React.FC<SearchBarCourseViewProps> = ({
  placeHolder,
  className,
  onMouseIn,
  onMouseOut,
  value,
  mouseValue,
  onChangeInput
}) => {
  return (
    <div
      className={clsx(
        'border-[#D0D5DD] border rounded-full gap-x-1.5 px-2 lg:px-4 py-2 lg:py-2.5 h-fit flex items-center transition-[max-width] duration-1000 ease-in-out origin-left',
        mouseValue ? 'md:max-w-80 lg:max-w-full' : 'md:max-w-60 lg:max-w-80',
        className,
      )}
      onMouseEnter={onMouseIn}
      onMouseLeave={onMouseOut}
    >
      <button className="mr-0 md:mr-1">
        <Image
          alt="icon search"
          src={'/icons/search-normal.svg'}
          width={15}
          height={15}
          className="ml-0"
        />
      </button>
      <input
        type="text"
        placeholder={placeHolder}
        className="font-poppins text-[#667085] text-xs md:text-base w-full px-1 md:px-3 lg:px-5 border-none outline-none focus:outline-none focus:ring-0"
        value={value}
        onChange={onChangeInput}
      />
    </div>
  );
};

export default SearchBarCourseView;
