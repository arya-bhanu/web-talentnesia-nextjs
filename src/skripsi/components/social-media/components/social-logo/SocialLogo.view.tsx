import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ISocialLogo } from './socialLogo.type';
import SkeletonLoader from '../../../skeleton-animation';

const SocialLogoView: React.FC<ISocialLogo> = ({
  url_icon,
  url_link,
  isLoading,
}) => {
  return (
    <Link href={url_link}>
      <SkeletonLoader
        visible={isLoading ? isLoading : false}
        width={35}
        height={35}
      />
      {!isLoading && (
        <>
          <Image
            alt="social logo image"
            src={url_icon}
            width={35}
            height={35}
            className="rounded-full object-cover"
          />
        </>
      )}
    </Link>
  );
};

export default SocialLogoView;
