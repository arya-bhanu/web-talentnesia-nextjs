import React, { useState } from 'react'; 
import Filter from '@/../public/icons/filter.svg';

interface FilterMenuProps {
  onFilterChange: (status: string) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ onFilterChange }) => {
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  const toggleFilterMenu = () => {
    setFilterMenuOpen(!filterMenuOpen);
  };

  const handleFilterChange = (status: string) => {
    onFilterChange(status);
    setFilterMenuOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleFilterMenu}
        className="flex items-center gap-2 bg-gray-100"
      >
        <Filter />
      </button>
      {filterMenuOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-48">
          <ul className='text-sm font-base'>
            <li
              onClick={() => handleFilterChange('Attended')}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              Attended
            </li>
            <li
              onClick={() => handleFilterChange('Missed')}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              Missed
            </li>
            <li
              onClick={() => handleFilterChange('')}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              View All
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterMenu;
