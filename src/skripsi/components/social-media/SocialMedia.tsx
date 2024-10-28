import React from 'react';
import SocialMediaView from './SocialMedia.view';
import clsx from 'clsx';
import { ISocialLogo } from './components/social-logo/socialLogo.type';

const SocialMedia: React.FC<{
  className?: string;
  isLoading?: boolean;
  dataSocialMedia: ISocialLogo[];
}> = ({ className, isLoading, dataSocialMedia }) => {
  return (
    <SocialMediaView
      className={clsx('flex items-center gap-3', className)}
      dataSocialMedia={dataSocialMedia}
      isLoading={isLoading}
    />
  );
};

export default SocialMedia;
