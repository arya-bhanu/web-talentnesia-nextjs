import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { SearchBarViewProps } from './searchBar.type';

const SearchBarView: React.FC<SearchBarViewProps> = ({
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
      <input
        type="text"
        placeholder={placeHolder}
        className="font-poppins text-[#667085] text-sm w-full px-2 md:px-3 lg:px-5 border-none outline-none focus:outline-none focus:ring-0"
        value={value}
        onChange={onChangeInput}
        
      />
      <button>
        <Image
          alt="icon search"
          src={'/icons/search-normal.svg'}
          width={15}
          height={15}
          className="mr-1 md:mr-2 lg:mr-3"
        />
      </button>
    </div>
  );
};

export default SearchBarView;
