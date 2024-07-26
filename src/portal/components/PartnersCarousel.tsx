import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export type Partners = {
	imgUrl: string;
	link?: string;
};

const dataPartners: Partners[] = [
	{ imgUrl: '/img/landing/partners/logo-1.svg' },
	{ imgUrl: '/img/landing/partners/logo-2.svg' },
	{ imgUrl: '/img/landing/partners/logo-3.svg' },
	{ imgUrl: '/img/landing/partners/logo-4.svg' },
	{ imgUrl: '/img/landing/partners/logo-5.svg' },
	{ imgUrl: '/img/landing/partners/logo-6.svg' },
	{ imgUrl: '/img/landing/partners/logo-7.svg' },
];

const PartnersCarousel = ({
	className,
	headingText = 'Partner Kolaborasi Bantu Mewujudkan Karir Impianmu',
	partners = dataPartners,
}: {
	className?: string;
	headingText?: string;
	partners?: Partners[];
}) => {
	return (
		<div className={className}>
			<h2 className='font-poppins font-semibold text-3xl max-w-xl leading-10'>
				{headingText}
			</h2>
			<div className='mt-20 flex items-center flex-wrap justify-between'>
				{dataPartners.map((partner, index: number) => (
					<Link
						href={partner.link || '/'}
						key={index}
					>
						<Image
							alt='partner image'
							src={partner.imgUrl}
							width={120}
							height={30}
							className='w-32 h-14 object-contain'
						/>
					</Link>
				))}
			</div>
		</div>
	);
};

export default PartnersCarousel;
