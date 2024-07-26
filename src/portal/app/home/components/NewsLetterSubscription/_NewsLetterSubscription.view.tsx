import NewsLetterSubscriptionCard from '@/portal/components/NewsLetterSubscriptionCard';
import React from 'react';

const NewsLetterSubscriptionSectionView = ({
	className,
}: {
	className?: string;
}) => {
	return (
		<section className={className}>
			<NewsLetterSubscriptionCard
				subTitle='Mulai berlangganan newsletter kami untuk mendapatkan update artikel terbaru dari Talentnesia'
				color={{
					bg: 'bg-[#00558C]',
					text: 'text-[#FFFFFF]',
					input: '#FFFFFF',
				}}
				actionButton={{
					bgColor: 'bg-[#FFC862]',
					text: 'Gabung Sekarang',
					textColor: 'text-[#2B2E33]',
				}}
				title='Dapatkan Wawasan Eksklusif Sesuai Minatmu Langsung melalui Emailmu'
			/>
		</section>
	);
};

export default NewsLetterSubscriptionSectionView;
