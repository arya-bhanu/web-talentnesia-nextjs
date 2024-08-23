import React from 'react';
import { FilterCategory } from './filter.type';

interface FilterViewProps {
  filterCategories: FilterCategory[];
}

const FilterView: React.FC<FilterViewProps> = ({ filterCategories }) => {
  return (
    <div className="hidden md:block space-y-2 w-[280px] overflow-y-auto border border-gray-300 rounded-lg">
      <div className="bg-blue-500 text-white font-bold text-[24px] p-5">
        Filter
      </div>

      {filterCategories.map((category, index) => (
        <details
          key={index}
          className="group overflow-hidden transition-all duration-300 ease-in-out"
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
  );
};

export default FilterView;
