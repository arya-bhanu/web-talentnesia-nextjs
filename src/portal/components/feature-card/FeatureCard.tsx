import React from 'react';
import FeatureCardView from './FeatureCard.view';
import { FeatureCardProps } from './featureCard.type';

const FeatureCard: React.FC<FeatureCardProps> = (props) => {
  return <FeatureCardView {...props} />;
};

export default FeatureCard;
