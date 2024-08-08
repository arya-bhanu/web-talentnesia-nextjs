import React from 'react';
import EliteClassSectionView from './EliteClass.view';
import { EliteClassSectionViewProps } from './eliteClass.type';

const EliteClass: React.FC<EliteClassSectionViewProps> = ({ className, courses }) => {
  return <EliteClassSectionView className={className} courses={courses} />;
};

export default EliteClass;
