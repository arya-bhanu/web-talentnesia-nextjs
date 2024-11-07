'use client';
import RoundedPrimaryButton from '@/portal/components/rounded-primary-button/RoundedPrimaryButton';
import { ObserverContext } from '@/utils/portal/ObserverProvider';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useContext } from 'react';
import { IDataHero } from './Hero.type';

const HeroSectionView = ({
  className,
  isLoading,
  dataHero,
}: {
  className?: string;
  isLoading?: boolean;
  dataHero: IDataHero;
}) => {
  const { headerObserver } = useContext(ObserverContext);
  return (
    <section
      ref={headerObserver.observerRef}
      className={clsx(
        className,
        'bg-primary min-h-[80vh] lg:min-h-[80vh] md:min-h-[70vh] pb-10',
      )}
    >
      <div className="flex container pt-28 md:pt-32 lg:pt-36 xl:pt-40">
        <div className="flex-[1]">
          <h1 className="font-semibold text-white font-poppins text-2xl md:text-3xl lg:text-4xl xl:text-5xl  lg:leading-normal xl:leading-[58px]">
            {dataHero.heading}
          </h1>
          <p className="text-white text-base font-normal font-inter leading-6 mt-7 ">
            {dataHero.subheading}
          </p>
          <RoundedPrimaryButton className="px-5 py-2.5 font-poppins mt-14">
            Start Your Career
          </RoundedPrimaryButton>
        </div>
        <div className="flex-[2] justify-end lg:flex hidden">
          <Image
            id="data-image"
            alt="hero image"
            className="block object-contain"
            src={dataHero.hero_image}
            width={620}
            height={523}
          />
        </div>
      </div>
      <h4 className="font-poppins font-normal text-base md:text-lg lg:text-xl container text-white mt-5 ">
        {dataHero.subtitle}
      </h4>
    </section>
  );
};

export default HeroSectionView;
