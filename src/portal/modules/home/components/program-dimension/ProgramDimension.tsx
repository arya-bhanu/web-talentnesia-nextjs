import React from 'react';
import ProgramDimensionSectionView from './ProgramDimension.view';
import { Programs } from '@/portal/components/program-dimension-card/programDimensionCard.type';

interface ProgramDimensionProps {
  className?: string;
  programs: Programs[];
}

const ProgramDimension: React.FC<ProgramDimensionProps> = ({ className, programs }) => {
  return <ProgramDimensionSectionView className={className} programs={programs} />;
};

export default ProgramDimension;
