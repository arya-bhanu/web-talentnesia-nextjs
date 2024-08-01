import React from 'react';
import { HeroSectionView } from './components/hero-section';
import { PartnerView } from './components/partners-section';
import { BenefitsView } from './components/benefits-section';
import { Divider } from '@/portal/components/divider';
import { FeaturesView } from './components/features-section';
import { ProgramView } from './components/program-section';
import PartnersCarousel from '@/portal/components/partners-carousel';
import UserStoryCard from '@/portal/components/user-story-card';
import { ContactView } from './components/contact-section';

export const IicpView: React.FC = () => { 
  return (
    <>
      <HeroSectionView />
      <main className='container'>
        <PartnerView className='py-10 md:py-20' />
        <BenefitsView className='py-10 md:py-20' />
        <Divider className='py-5' />
        <FeaturesView className='py-10 md:py-20' />
        <ProgramView className='py-10 md:py-10' />
        <PartnersCarousel className='py-5 md:py-10' />
        <UserStoryCard className='mt-16 md:mt-20 lg:mt-32' />
        <Divider className='py-10 md:py-20' />
        <ContactView className='py-10 md:py-20' />
      </main>
    </>
  );
};
