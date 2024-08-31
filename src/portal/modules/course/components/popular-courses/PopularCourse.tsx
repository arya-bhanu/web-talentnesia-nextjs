import React from 'react';
import { PopularCoursesSectionViewProps } from './popularCourse.type';
import PopularCoursesSectionView from './PopularCourse.view';

const PopularCourses: React.FC<PopularCoursesSectionViewProps> = ({ className, courses, isLoading }) => {
  return <PopularCoursesSectionView className={className} courses={courses} isLoading={isLoading}/>;
};

export default PopularCourses;
