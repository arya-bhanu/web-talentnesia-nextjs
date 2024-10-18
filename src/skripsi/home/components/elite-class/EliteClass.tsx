import React from 'react';
import EliteClassSectionView from './EliteClass.view';
import { EliteClassSectionViewProps } from './eliteClass.type';

const EliteClass: React.FC<EliteClassSectionViewProps> = ({
  className,
  courses,
  isLoading
}) => {
  return <EliteClassSectionView className={className} courses={courses} isLoading={isLoading}/>;
};

export default EliteClass;
