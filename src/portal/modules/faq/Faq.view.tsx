import React from 'react';
import { HeroSection } from './components/hero-section';
import { HeroCard } from './components/hero-card';
import { Category } from './components/category';
import { Accordion } from './components/accordion';

export const FaqView = () => {
  return (
    <>
      <HeroSection />
      <main className="container mx-auto space-y-8">
        <HeroCard className="mb-10" />
        <h2 className="text-xl font-semibold text-[#344054] mb-4">
          Kategori FAQ
        </h2>
        <div className="space-y-8 md:flex">
          <div className="md:w-[40%] xl:w-[30%] md:mr-4 xl:mr-8">
            <Category />
          </div>
          <div className="md:w-full md:ml-10 xl:ml-20">
            <Accordion />
          </div>
        </div>
      </main>
    </>
  );
};
