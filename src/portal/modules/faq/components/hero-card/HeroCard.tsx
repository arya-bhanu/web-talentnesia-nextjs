import React from 'react'
import { HeroCardData } from './HeroCard.data';
import { HeroCardView } from './HeroCard.view';

export const HeroCard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {HeroCardData.map((card, index) => (
        <HeroCardView key={index} {...card} />
      ))}
    </div>
  );
};