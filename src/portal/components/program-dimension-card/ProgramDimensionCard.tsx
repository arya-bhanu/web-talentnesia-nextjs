import React from 'react';
import ProgramDimensionCardView from './ProgramDimensionCard.view';
import { IProgramDimension } from './programDimensionCard.type';

const ProgramDimensionCard = (props: IProgramDimension) => {
  return <ProgramDimensionCardView {...props} />;
};

export default ProgramDimensionCard;
