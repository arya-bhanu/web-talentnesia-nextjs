import clsx from 'clsx';
import React from 'react';
import { HeroSectionView } from './Hero.view';

export const HeroSection = ({ className }: { className?: string }) => {
  return (
    <>
      <HeroSectionView className={clsx(className)} />
    </>
  );
};
