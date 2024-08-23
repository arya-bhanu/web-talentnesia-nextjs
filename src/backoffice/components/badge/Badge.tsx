import React from 'react';
import BadgeView from './Badge.view';
import { IBadgeType } from './badge.type';

const Badge: React.FC<IBadgeType> = (props) => {
  return <BadgeView {...props} />;
};

export default Badge;
