import React from 'react';
import PartnersCarousel from '@/portal/components/partners-carousel/PartnersCarousel';
const PartnersSectionView = ({ className }: { className?: string }) => {
	return (
		<div className={className}>
			<PartnersCarousel />
		</div>
	);
};

export default PartnersSectionView;
