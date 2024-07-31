'use client';
import BenefitCard from '@/portal/components/benefit-card';
import { IBenefitCard } from '@/portal/components/benefit-card/BenefitCard.view';
import clsx from 'clsx';
import React from 'react';

import { Pagination } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';

import './benefits.css';

const dataBenefits: IBenefitCard[] = [
	{
		label: 'Berizin Resmi dari Pemerintah',
		imgUrl: '/img/landing/benefits/certificate-svgrepo-com 2.svg',
	},
	{
		imgUrl: '/img/landing/benefits/book-svgrepo-com 1.svg',
		label: 'Kurikulum Terbaru dan Standar Industri',
	},
	{
		imgUrl: '/img/landing/benefits/learn-svgrepo-com 1.svg',
		label: 'Instruktur Praktisi dengan Lisensi Resmi',
	},
	{
		imgUrl: '/img/landing/benefits/ecology-svgrepo-com 1.svg',
		label: 'Dukungan Ekosistem Industri ',
	},
];
const BenefitsSectionView = ({ className }: { className?: string }) => {
	return (
		<section
			className={clsx(
				className,
				'flex items-center justify-center gap-3 md:gap-5 lg:gap-7 relative top-0 lg:-top-6 xl:-top-12'
			)}
		>
			<Swiper
				style={{ height: '100%' }}
				spaceBetween={30}
				pagination={{
					clickable: true,
				}}
				slidesPerView={1}
				breakpoints={{
					320: {
						slidesPerView: 2,
					},
					768: {
						slidesPerView: 3,
					},
					1024: {
						slidesPerView: 4,
					},
				}}
				modules={[Pagination]}
				className='mySwiper'
			>
				{dataBenefits.map((el, index) => (
					<SwiperSlide key={index}>
						<BenefitCard props={{ ...el }} />
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};

export default BenefitsSectionView;
