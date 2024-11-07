import React from 'react';
import BenefitCardView from './BenefitCard.view';
import { IBenefitCard } from './benefitCard.type';

const BenefitCard = ({
  className,
  props,
  number,
}: {
  className?: string;
  props: IBenefitCard;
  number: number;
}) => {
  return (
    <BenefitCardView className={className} props={props} number={number} />
  );
};

export default BenefitCard;
