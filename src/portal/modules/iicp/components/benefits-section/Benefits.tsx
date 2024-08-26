import React from 'react';
import { BenefitsView } from './Benefits.view';

export const Benefits = ({ className, isLoading }: { className?: string, isLoading?: boolean }) => {
  return <BenefitsView className={className} isLoading={isLoading}/>;
};
