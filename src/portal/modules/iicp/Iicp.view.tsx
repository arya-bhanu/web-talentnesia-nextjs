import React from 'react';
import { HeroSection } from './components/hero-section';
import { Partners } from './components/partners-section';
import { Benefits } from './components/benefits-section';
import { Divider } from '@/portal/components/divider';
import { Features } from './components/features-section';
import { Program } from './components/program-section';
import PartnersCarousel from '@/portal/components/partners-carousel';
import UserStoryCard from '@/portal/components/user-story-card';
import { Contact } from './components/contact-section';

export const IicpView: React.FC = () => { 
  return (
    <>
      <HeroSection />
      <main className='container'>
        <Partners className='py-10 md:py-20' />
        <Benefits className='py-10 md:py-20' />
        <Divider className='py-5' />
        <Features className='py-10 md:py-20' />
        <Program className='py-10 md:py-10' />
        <PartnersCarousel className='py-5 md:py-10' />
        <UserStoryCard className='mt-16 md:mt-20 lg:mt-32' />
        <Divider className='py-10 md:mt-20' />
        <Contact className='py-10 md:py-15' />
      </main>
    </>
  );
};
