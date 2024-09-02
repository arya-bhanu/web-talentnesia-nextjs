import React from 'react';
import BenefitsView from './benefit.view';
import clsx from 'clsx';

export const Benefits = ({ className, isLoading }: { className?: string, isLoading?: boolean }) => {
  return (
    <>
      <BenefitsView className={clsx(className)} isLoading={isLoading}/>
    </>
  );
};
