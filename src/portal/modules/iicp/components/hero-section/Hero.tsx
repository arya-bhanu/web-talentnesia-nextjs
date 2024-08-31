import React from 'react';
import clsx from 'clsx';
import { HeroSectionView } from './Hero.view';

export const HeroSection = ({ className, isLoading }: { className?: string, isLoading?: boolean }) => {
  return <HeroSectionView className={clsx(className)} isLoading={isLoading} />;
};
