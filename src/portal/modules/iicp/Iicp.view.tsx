'use client';

import React from 'react';
import { HeroSection } from './components/hero-section';
import { PartnersSection } from './components/partners-section';
import { Benefits } from './components/benefits-section';
import { Divider } from '@/portal/components/divider';
import { Features } from './components/features-section';
import { Program } from './components/program-section';
import PartnersCarousel from '@/portal/components/partners-carousel';
import UserStoryCard from '@/portal/components/user-story-card';
import { Contact } from './components/contact-section';
import { useIicpData } from './hooks/useIicp';
import SkeletonLoader from '@/portal/components/skeleton-animation';
import { IicpViewProps } from './iicp.type';

const IicpView: React.FC<IicpViewProps> = ({ data, isLoading }) => {
  //const { data, isLoading, error } = useIicpData();
  
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading data</div>;

  //const { partners, testimonials } = data;

  return (
    <>
      <HeroSection isLoading={isLoading} />
      <main className="container">
        <PartnersSection className="py-10 md:py-20" partners={data?.partners ?? []} isLoading={isLoading} />
        <Benefits className="py-10 md:py-20" isLoading={isLoading}/>
        <Divider className="py-5" />
        <Features className="py-10 md:py-20" isLoading={isLoading} />
        <Program className="py-10 md:py-10" isLoading={isLoading}/>
        <PartnersCarousel className="py-5 md:py-10" partners={data?.partners ?? []} isLoading={isLoading} />
        <UserStoryCard
          className="mt-16 md:mt-20 lg:mt-32"
          testimonials={data?.testimonials ?? []}
          isLoading={isLoading}
        />
        <Divider className="py-10 md:mt-20" />
        <Contact className="py-10 md:py-15" isLoading={isLoading}/>
      </main>
    </>
  );
};
export default IicpView;