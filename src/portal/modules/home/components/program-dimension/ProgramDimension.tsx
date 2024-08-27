import React from 'react';
import ProgramDimensionSectionView from './ProgramDimension.view';
import { Programs } from '@/portal/components/program-dimension-card/programDimensionCard.type';

interface ProgramDimensionProps {
  className?: string;
  programs: Programs[];
  isLoading? : boolean;
}

const ProgramDimension: React.FC<ProgramDimensionProps> = ({
  className,
  programs,
  isLoading
}) => {
  return (
    <ProgramDimensionSectionView className={className} programs={programs} isLoading={isLoading}/>
  );
};

export default ProgramDimension;
