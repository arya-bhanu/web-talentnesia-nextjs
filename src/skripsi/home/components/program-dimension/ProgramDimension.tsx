import React from 'react';
import ProgramDimensionSectionView from './ProgramDimension.view';
import { ProgramDimensionProps } from './programDimension.type';

const ProgramDimension: React.FC<ProgramDimensionProps> = ({
  className,
  programs,
  isLoading,
  cardCareer,
}) => {
  return (
    <ProgramDimensionSectionView
      className={className}
      programs={programs}
      isLoading={isLoading}
      cardCareer={cardCareer}
    />
  );
};

export default ProgramDimension;
