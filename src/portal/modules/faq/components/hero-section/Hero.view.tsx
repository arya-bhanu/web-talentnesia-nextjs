import React from 'react';
import Image from 'next/image';
import { Breadcrumb } from '@/portal/components/breadcrumb';

export const HeroSectionView = () => {
  return (
    <section className="bg-secondary min-h-[65vh] md:min-h-[60vh] lg:min-h-[80vh] font-poppins">
      <div className="container pt-10 md:pt-14 lg:pt-24 flex flex-col lg:flex-row items-center lg:items-start">
        <div className="xl:w-[40%] lg:text-left pt-10 space-y-10">
          <Breadcrumb className="my-8 md:my-0 md:mb-5" pathSegments={[]} />
          <h1 className="font-bold text-[#2B2E33] font-poppins text-xl md:text-4xl xl:text-5xl lg:leading-normal xl:leading-[58px]">
          FAQ
          </h1>
          <p className="text-[#2B2E33] text-xl font-inter mt-7 ">
          Join Talentnesia and unlock your full potential with our transformative learning experiences
          </p>
        </div>
      </div>
    </section>
  );
};
