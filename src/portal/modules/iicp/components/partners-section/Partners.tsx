import React from 'react';
import { PartnerView } from './Partners.view';
import { Partners } from './partners.type';

export const PartnersSection = ({
  className,
  partners,
}: {
  className?: string;
  partners: Partners[];
}) => {
  return <PartnerView className={className} partners={partners} />;
};
