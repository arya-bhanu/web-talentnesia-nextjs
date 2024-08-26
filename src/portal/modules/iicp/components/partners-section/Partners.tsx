import React from 'react';
import { PartnerView } from './Partners.view';
import { Partners } from './partners.type';

export const PartnersSection = ({
  className,
  partners,
  isLoading
}: {
  className?: string;
  partners: Partners[];
  isLoading?: boolean;
}) => {
  return <PartnerView className={className} partners={partners} isLoading={isLoading} />;
};
