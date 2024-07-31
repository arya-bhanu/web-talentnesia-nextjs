import React from 'react';
import SocialLogoView from './SocialLogo.view';
import { ISocialLogo } from './socialLogo.type';

const SocialLogo: React.FC<ISocialLogo> = (props) => {
  return <SocialLogoView {...props} />;
};

export default SocialLogo;
