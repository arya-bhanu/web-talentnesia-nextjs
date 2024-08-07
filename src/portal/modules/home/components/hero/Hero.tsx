import React from 'react';
import HeroSectionView from './Hero.view';

const Hero = ({ className }: { className?: string }) => {
  return <HeroSectionView className={className} />;
};

export default Hero;
