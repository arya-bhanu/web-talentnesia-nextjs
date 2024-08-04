import React from 'react';
import { HeroSectionView } from './components/hero-section';
import { HeroCard } from './components/hero-card';
import { Category } from './components/category';
import { Accordion } from './components/accordion';

export const FaqView = () => {
  return (
    <>
      <HeroSectionView />
      <main className="container mx-auto">
        <HeroCard />
        <h2 className="text-xl font-semibold text-[#344054] mb-4">Kategori FAQ</h2>
        <div className="flex">
          <div className="md:w-[40%] xl:w-[25%] md:pr-4 xl:mr-8">
            <Category />
          </div>
          <div className="md:w-[60%] xl:w-[60%] pl-2">
            <Accordion />
            <div className=""></div>
          </div>
        </div>
      </main>
    </>
  );
};
