import React from 'react';
import { AllClassProps } from './allClass.type';
import AllClassView from './AllClass.view';

const AllClass: React.FC<AllClassProps> = ({ courses, filterOptions, isLoading }) => {
  return <AllClassView courses={courses} filterOptions={filterOptions} isLoading={isLoading} />;
};

export default AllClass;
