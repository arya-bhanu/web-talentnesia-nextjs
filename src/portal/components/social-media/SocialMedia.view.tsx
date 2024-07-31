// file: SocialMedia.view.tsx

import React from 'react';
import SocialLogo from '../social-logo/SocialLogo';
import { SocialMediaViewProps } from './socialMedia.type';

const SocialMediaView: React.FC<SocialMediaViewProps> = ({
  className,
  dataSocialMedia,
}) => {
  return (
    <nav className={className}>
      {dataSocialMedia.map((social, index) => (
        <SocialLogo key={index} {...social} />
      ))}
    </nav>
  );
};

export default SocialMediaView;
