import React from 'react';
import FeaturesView from './Features.view';
import clsx from 'clsx';

export const Features = ({ className, isLoading }: { className?: string, isLoading?: boolean }) => {
  return (
    <>
      <FeaturesView className={clsx(className)} isLoading={isLoading}/>
    </>
  );
};
