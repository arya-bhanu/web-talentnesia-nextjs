import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface ISocialLogo {
	imgUrl: string;
	linkSocial: string;
}
const SocialLogo = (props: ISocialLogo) => {
	return (
		<Link href={props.linkSocial}>
			<Image
				alt='social logo image'
				src={props.imgUrl}
				width={35}
				height={35}
				className='rounded-full object-cover'
			/>
		</Link>
	);
};

export default SocialLogo;
