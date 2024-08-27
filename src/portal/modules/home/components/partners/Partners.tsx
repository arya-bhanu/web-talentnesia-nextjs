import React from 'react';
import PartnersSectionView from './Partners.view';
import { PartnersProps } from './partners.type';

const Partners = ({ className, partners, isLoading }: PartnersProps) => {
  return <PartnersSectionView className={className} partners={partners} isLoading={isLoading}/>;
};

export default Partners;
