import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ISocialLogo } from './socialLogo.type';

const SocialLogoView: React.FC<ISocialLogo> = ({ imgUrl, linkSocial }) => {
  return (
    <Link href={linkSocial}>
      <Image
        alt="social logo image"
        src={imgUrl}
        width={35}
        height={35}
        className="rounded-full object-cover"
      />
    </Link>
  );
};

export default SocialLogoView;
