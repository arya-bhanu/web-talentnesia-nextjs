import React from 'react';
import FilterView from './Filter.view';
import { filterCategories } from './filter.data'; 

const Filter: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <FilterView filterCategories={filterCategories} />
    </div>
  );
};

export default Filter;
