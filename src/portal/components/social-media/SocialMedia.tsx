import React from 'react';
import SocialLogo, { ISocialLogo } from '../social-logo/SocialLogo';
import clsx from 'clsx';

const dataSocialMedia: ISocialLogo[] = [
	{ imgUrl: '/img/landing/social-media/facebook.svg', linkSocial: '/' },
	{ imgUrl: '/img/landing/social-media/instagram.svg', linkSocial: '/' },
	{ imgUrl: '/img/landing/social-media/linkedin.svg', linkSocial: '/' },
	{ imgUrl: '/img/landing/social-media/twitter.svg', linkSocial: '/' },
];
const SocialMedia = ({ className }: { className?: string }) => {
	return (
		<nav className={clsx('flex items-center gap-3', className)}>
			{dataSocialMedia.map((social, index: number) => (
				<SocialLogo
					key={index}
					{...social}
				/>
			))}
		</nav>
	);
};

export default SocialMedia;
