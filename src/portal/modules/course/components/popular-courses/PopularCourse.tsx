import React from 'react';
import { PopularCoursesSectionViewProps } from './popularCourse.type';
import PopularCoursesSectionView from './PopularCourse.view';

const PopularCourses: React.FC<PopularCoursesSectionViewProps> = ({ className, courses }) => {
  return <PopularCoursesSectionView className={className} courses={courses} />;
};

export default PopularCourses;
