import React from 'react'
import { HeroCardData } from './HeroCard.data';
import { HeroCardView } from './HeroCard.view';
import clsx from 'clsx';

export const HeroCard = ({className}: {className?: string}) => {
  return (
    <section className={clsx(className)}>
      <div className="grid grid-cols-1">
        <HeroCardView cards={HeroCardData} />
      </div>
    </section>
  );
};