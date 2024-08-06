import React from 'react';
import FeaturesView from './Features.view';
import clsx from 'clsx';

export const Features = ({ className }: { className?: string }) => {
  return (
    <>
      <FeaturesView className={clsx(className)} />
    </>
  );
};
