import React from 'react';
import PartnersCarousel from '@/portal/components/partners-carousel/PartnersCarousel';
import { PartnersProps } from './partners.type';

const PartnersSectionView = ({ className, partners, isLoading }: PartnersProps) => {
  return (
    <div className={className}>
      <PartnersCarousel partners={partners} isLoading={isLoading}/>
    </div>
  );
};

export default PartnersSectionView;
