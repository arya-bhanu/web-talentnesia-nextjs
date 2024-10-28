import React from 'react';
import BenefitsSectionView from './Benefits.view';
import { IBenefitCard } from './benefit-card/benefitCard.type';

const Benefits = ({
  className,
  dataBenefits,
}: {
  className?: string;
  dataBenefits: IBenefitCard[];
}) => {
  return (
    <BenefitsSectionView className={className} dataBenefits={dataBenefits} />
  );
};

export default Benefits;
