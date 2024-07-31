import React from 'react';
import FeatureCardView from './FeatureCard.view';
import { IFeatureCard } from './featureCard.type';

const FeatureCard = (props: IFeatureCard) => {
  return <FeatureCardView {...props} />;
};

export default FeatureCard;
