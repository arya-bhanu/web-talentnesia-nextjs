import React, { useState } from 'react';
import { FilterCategory } from './filter.type';

interface FilterViewProps {
  filterCategories: FilterCategory[];
}

const FilterView: React.FC<FilterViewProps> = ({ filterCategories }) => {
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);

  const toggleMobileFilter = () => {
    setIsMobileFilterVisible(!isMobileFilterVisible);
  };

  return (
    <div>
      {/* Tombol filter untuk mobile */}
      <button
        className="md:hidden block bg-[#219EBC] text-white px-4 py-2 rounded-md text-center font-semibold"
        onClick={toggleMobileFilter}
      >
        {isMobileFilterVisible ? 'Close Filter' : 'Open Filter'}
      </button>

      {/* Container filter untuk mobile & desktop */}
      <div className={`md:block ${isMobileFilterVisible ? 'block' : 'hidden'} space-y-2 w-full md:w-[280px] md:overflow-y-auto md:border md:border-gray-300 md:rounded-lg`}>
        <div className="text-white font-bold text-[24px] p-5" style={{ backgroundColor: '#219EBC' }}>
          Filter
        </div>

        {filterCategories.map((category, index) => (
          <details
            key={index}
            className="group overflow-hidden transition-all duration-300 ease-in-out"
            open={index === 0}
          >
            <summary
              className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-700 transition"
            >
              <span className="text-[18px] font-semibold">{category.title}</span>
              <span className="transition-transform duration-300 ease-in-out transform group-open:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </summary>

            <div className="max-h-0 overflow-hidden transition-max-height duration-300 ease-in-out group-open:max-h-[1000px]">
              <ul className="space-y-1 p-4">
                {category.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <label htmlFor={`Filter${option.value}`} className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`Filter${option.value}`}
                        className="size-5 rounded border-gray-300"
                      />
                      <span className="text-sm font-semibold text-gray-700">
                        {option.label}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

export default FilterView;
