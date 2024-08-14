import React from 'react';
import clsx from 'clsx';
import { HeroSectionView } from './Hero.view';

export const HeroSection = ({ className }: { className?: string }) => {
  return <HeroSectionView className={clsx(className)} />;
};
