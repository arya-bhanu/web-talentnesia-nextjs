'use client'
import React from 'react';
import { HeroSectionView } from './components/hero-section/Hero.view';
import { ContactCard } from './components/contact-card';
import { ContactForm } from './components/contact-form';

export const ContactView = () => {
  const [skeletonAnimation, setTime] = React.useState(true);

  React.useEffect(() => {
    
    
    const timer = setTimeout(() => {
      setTime(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <HeroSectionView isLoading={skeletonAnimation} />
      <main className="container py-10 md:px-0 ">
        <div className="container flex flex-col md:flex-row" >
          <ContactCard className="md:size-[50%] xl:w-[45%] mb-8 md:mb-0 mr-4" isLoading={skeletonAnimation}/>
          <ContactForm className="xl:w-1/2" isLoading={skeletonAnimation} />
        </div>
      </main>
    </>
  );
};
