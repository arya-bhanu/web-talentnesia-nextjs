import React from 'react';
import PartnersCarousel from '@/portal/components/partners-carousel/PartnersCarousel';
import { PartnersProps } from './partners.type';

const PartnersSectionView = ({
  className,
  dataPartner,
  isLoading,
}: PartnersProps) => {
  return (
    <div className={className}>
      <PartnersCarousel
        partners={dataPartner.partners}
        heading={dataPartner.heading}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PartnersSectionView;
