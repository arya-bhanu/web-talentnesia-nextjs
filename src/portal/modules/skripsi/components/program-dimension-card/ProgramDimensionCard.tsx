import React from 'react';
import ProgramDimensionCardView from './ProgramDimensionCard.view';
import { Programs } from './programDimensionCard.type';

const ProgramDimensionCard = (props: Programs) => {
  return <ProgramDimensionCardView {...props} />;
};

export default ProgramDimensionCard;
