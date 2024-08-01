import React from 'react';
import Image from 'next/image';
import { Breadcrumb } from '@/portal/components/breadcrumb';

export const HeroSectionView = ({ className }: { className?: string }) => {
  return (
    <section className="bg-secondary  min-h-[70vh] lg:min-h-[80vh]">
      <div className="container pt-10 md:pt-14 lg:pt-24 flex flex-col lg:flex-row items-center lg:items-start">
        <div className="flex-[1] text-center lg:text-left pt-10">
          <Breadcrumb />
          <h1 className="font-semibold text-[#2B2E33] font-poppins text-xl md:text-2xl lg:text-2xl xl:text-4xl lg:leading-normal xl:leading-[58px]">
            Bridge the Gap: Empowering Education, Connecting Schools and Industries
          </h1>
          <p className="text-[#2B2E33] text-base font-inter mt-7 ">
            The industry-school collaboration program merges industry's
            practical skills with vocational education. Students learn from
            industry experts, grasp current job needs, and gain skills aligned
            with market demands. It ensures graduates are job-ready, boosting
            their employment prospects and creating a skilled workforce for
            industry needs.
          </p>
        </div>
        <div className="flex-[2] hidden lg:flex justify-end lg:justify-end items-center lg:items-end">
          <Image
            alt="image-hero"
            src="/img/iicp/hero-iicp.png"
            width={2659}
            height={2161}
            className="object-contain w-[752px] h-[611px]"
          />
        </div>
      </div>
    </section>
  );
};
