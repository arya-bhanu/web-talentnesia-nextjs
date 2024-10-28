import React from 'react';
import PartnersSectionView from './Partners.view';
import { PartnersProps } from './partners.type';

const Partners = ({ className, dataPartner, isLoading }: PartnersProps) => {
  return (
    <PartnersSectionView
      className={className}
      dataPartner={dataPartner}
      isLoading={isLoading}
    />
  );
};

export default Partners;
