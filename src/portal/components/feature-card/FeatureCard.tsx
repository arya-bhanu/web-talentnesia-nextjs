import React from 'react';
import FeatureCardView from './FeatureCard.view';
import { courses } from './featureCard.type';

const FeatureCard = (props: courses) => {
  return <FeatureCardView {...props} />;
};

export default FeatureCard;
