import React from 'react';
import { BestCourseSectionViewProps } from './bestCourse.type';
import BestCourseSectionView from './BestCourse.View';

const BestCourse: React.FC<BestCourseSectionViewProps> = ({ className, courses, isLoading }) => {
  return <BestCourseSectionView className={className} courses={courses || []} isLoading={isLoading} />;
};

export default BestCourse;
