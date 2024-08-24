import React from 'react';
import SocialMediaView from './SocialMedia.view';
import clsx from 'clsx';
import { dataSocialMedia } from './socialMedia.data';

const SocialMedia: React.FC<{ className?: string, isLoading?: boolean}> = ({ className, isLoading }) => {
  return (
    <SocialMediaView
      className={clsx('flex items-center gap-3', className)}
      dataSocialMedia={dataSocialMedia}
      isLoading={isLoading}
    />
  );
};

export default SocialMedia;
