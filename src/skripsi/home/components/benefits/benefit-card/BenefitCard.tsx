import React from 'react';
import BenefitCardView from './BenefitCard.view';
import { IBenefitCard } from './benefitCard.type';

const BenefitCard = ({
  className,
  props,
}: {
  className?: string;
  props: IBenefitCard;
}) => {
  return <BenefitCardView className={className} props={props} />;
};

export default BenefitCard;
