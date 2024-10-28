import React from 'react';
import EliteClassSectionView from './EliteClass.view';
import { EliteClassSectionViewProps } from './eliteClass.type';

const EliteClass: React.FC<EliteClassSectionViewProps> = ({
  className,
  isLoading,
  dataApi,
}) => {
  return (
    <EliteClassSectionView
      className={className}
      dataApi={dataApi}
      isLoading={isLoading}
    />
  );
};

export default EliteClass;
