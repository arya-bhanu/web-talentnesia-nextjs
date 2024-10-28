import React from 'react';
import HeroSectionView from './Hero.view';
import { IDataHero } from './Hero.type';

const Hero = ({
  className,
  isLoading,
  dataHero,
}: {
  className?: string;
  isLoading?: boolean;
  dataHero: IDataHero;
}) => {
  return (
    <HeroSectionView
      className={className}
      isLoading={isLoading}
      dataHero={dataHero}
    />
  );
};

export default Hero;
