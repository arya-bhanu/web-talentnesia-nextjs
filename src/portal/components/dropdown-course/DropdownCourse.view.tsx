import React from 'react';
import { DropdownItem } from './dropdownCourse.type';

interface DropdownCourseViewProps {
  isOpen: boolean;
  toggleDropdown: () => void;
  popularItems: DropdownItem[];
  otherItems: DropdownItem[];
  selectedItem: DropdownItem;
  onItemSelect: (item: DropdownItem) => void;
}

const DropdownCourseView: React.FC<DropdownCourseViewProps> = ({ isOpen, toggleDropdown, popularItems, otherItems, selectedItem, onItemSelect }) => {
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="text-slate-800 font-sm rounded-full text-sm px-4 py-1 md:px-6 md:py-2.5 text-center inline-flex items-center border border-slate-700"
        type="button"
      >
        {selectedItem.label}
        <svg
          className="w-2 h-2 ms-2 md:w-2.5 md:h-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        className={`absolute right-0 z-10 mt-2 w-36 md:w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 ${isOpen ? 'block' : 'hidden'}`}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          {popularItems.map(item => (
            <li key={item.label}>
              <a
                href="#"
                onClick={() => onItemSelect(item)}
                className="block px-3 py-1.5 md:px-4 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-bold"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="my-1 border-t border-gray-200 dark:border-gray-600"></li>
          {otherItems.map(item => (
            <li key={item.label}>
              <a
                href="#"
                onClick={() => onItemSelect(item)}
                className="block px-3 py-1.5 md:px-4 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownCourseView;
