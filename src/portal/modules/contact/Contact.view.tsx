import React from 'react';
import { HeroSectionView } from './components/hero-section/Hero.view';
import { ContactCard } from './components/contact-card';
import { ContactForm } from './components/contact-form';

export const ContactView = () => {
  return (
    <>
      <HeroSectionView />
      <main className="container py-10 md:px-0 ">
        <div className="container flex flex-col md:flex-row">
          <ContactCard className="md:size-[50%] xl:w-[45%] mb-8 md:mb-0 mr-4" />
          <ContactForm className="xl:w-1/2" />
        </div>
      </main>
    </>
  );
};
