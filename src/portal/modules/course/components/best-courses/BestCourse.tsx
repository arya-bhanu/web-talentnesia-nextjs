import React from 'react';
import { BestCourseSectionViewProps } from './bestCourse.type';
import BestCourseSectionView from './BestCourse.View';

const BestCourse: React.FC<BestCourseSectionViewProps> = ({ className, courses }) => {
  return <BestCourseSectionView className={className} courses={courses} />;
};

export default BestCourse;
