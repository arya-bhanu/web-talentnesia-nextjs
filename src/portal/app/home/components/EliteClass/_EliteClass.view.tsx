import FeatureCard, { IFeatureCard } from '@/portal/components/FeatureCard';
import React from 'react';

const datas: IFeatureCard[] = [
	{
		category: 'Beginner',
		imgUrl: '/img/landing/card-image.png',
		prevPrice: 4000000,
		price: 3000000,
		ratingNumber: 4.7,
		title: 'Animasi 3D For Beginners - Become An Expert in One Minute',
	},
	{
		category: 'Beginner',
		imgUrl: '/img/landing/card-image.png',
		prevPrice: 4000000,
		price: 3000000,
		ratingNumber: 4.7,
		title: 'Animasi 3D For Beginners - Become An Expert in One Minute',
	},
	{
		category: 'Beginner',
		imgUrl: '/img/landing/card-image.png',
		prevPrice: 4000000,
		price: 3000000,
		ratingNumber: 4.7,
		title: 'Animasi 3D For Beginners - Become An Expert in One Minute',
	},
	{
		category: 'Beginner',
		imgUrl: '/img/landing/card-image.png',
		prevPrice: 4000000,
		price: 3000000,
		ratingNumber: 4.7,
		title: 'Animasi 3D For Beginners - Become An Expert in One Minute',
	},
];
const EliteClassSectionView = ({ className }: { className?: string }) => {
	return (
		<section className={className}>
			<h2 className='font-poppins font-semibold text-3xl'>
				Kelas Unggulan Kami
			</h2>
			<p className='font-inter text-xl mt-3'>
				Program pilihan yang memberikan Kamu{' '}
				<strong>pelatihan interaktif dan peluang pekerjaan yang menarik</strong>
			</p>
			<div className='grid grid-cols-4 mt-9 gap-10'>
				{datas.map((feature, index: number) => (
					<FeatureCard
						key={index}
						{...feature}
					/>
				))}
			</div>
		</section>
	);
};

export default EliteClassSectionView;
