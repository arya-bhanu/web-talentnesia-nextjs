import BenefitCard from '@/portal/components/BenefitCard';
import { IBenefitCard } from '@/portal/components/BenefitCard/BenefitCard.view';
import clsx from 'clsx';
import React from 'react';

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
			className={clsx(className, 'flex items-center justify-center gap-7 relative -top-12')}
		>
			{dataBenefits.map((el, index) => (
				<BenefitCard
					key={index}
					props={{ ...el }}
				/>
			))}
		</section>
	);
};

export default BenefitsSectionView;
