import React from 'react';
import SocialMediaView from './SocialMedia.view';
import clsx from 'clsx';
import { dataSocialMedia } from './socialMedia.data';

const SocialMedia: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <SocialMediaView
      className={clsx('flex items-center gap-3', className)}
      dataSocialMedia={dataSocialMedia}
    />
  );
};

export default SocialMedia;
