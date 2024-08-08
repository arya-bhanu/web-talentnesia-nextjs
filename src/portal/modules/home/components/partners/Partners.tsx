import React from 'react';
import PartnersSectionView from './Partners.view';
import { PartnersProps } from './partners.type';

const Partners = ({ className, partners }: PartnersProps) => {
  return <PartnersSectionView className={className} partners={partners} />;
};

export default Partners;
