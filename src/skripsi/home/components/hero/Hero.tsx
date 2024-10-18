import React from 'react';
import HeroSectionView from './Hero.view';

const Hero = ({ className, isLoading }: { className?: string, isLoading? : boolean }) => {
  return <HeroSectionView className={className} isLoading={isLoading}/>;
};

export default Hero;
