'use client';
import RoundedPrimaryButton from '@/portal/components/rounded-primary-button/RoundedPrimaryButton';
import SkeletonLoader from '@/portal/components/skeleton-animation';
import { ObserverContext } from '@/utils/portal/ObserverProvider';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useContext } from 'react';

const HeroSectionView = ({
  className,
  isLoading,
}: {
  className?: string;
  isLoading?: boolean;
}) => {
  const { headerObserver } = useContext(ObserverContext);
  return (
    <section
      ref={headerObserver.observerRef}
      className={clsx(
        className,
        'bg-primary min-h-[80vh] lg:min-h-[80vh] md:min-h-[70vh] ',
      )}
    >
      <div className="flex container pt-28 md:pt-32 lg:pt-36 xl:pt-32">
        <div className="flex-[1]">
          <SkeletonLoader
            visible={isLoading ? isLoading : false}
            width={'80%'}
            height={40}
          />
          <SkeletonLoader
            visible={isLoading ? isLoading : false}
            width={'65%'}
            height={40}
          />
          <SkeletonLoader
            visible={isLoading ? isLoading : false}
            width={'90%'}
            height={40}
          />
          <SkeletonLoader
            visible={isLoading ? isLoading : false}
            height={10}
            containerStyle={{ marginTop: 50 }}
          />
          <SkeletonLoader
            visible={isLoading ? isLoading : false}
            height={10}
            width={'105%'}
          />
          <SkeletonLoader
            visible={isLoading ? isLoading : false}
            height={10}
            width={'50%'}
          />
          <SkeletonLoader
            visible={isLoading ? isLoading : false}
            width={'55%'}
            height={30}
            containerStyle={{ marginTop: 56 }}
          />
          {!isLoading && (
            <>
              <h1 className="font-semibold text-white font-poppins text-2xl md:text-3xl lg:text-4xl xl:text-5xl  lg:leading-normal xl:leading-[58px]">
                Elevate Your IT Career with Industry Pioneers
              </h1>
              <p className="text-white text-base font-normal font-inter leading-6 mt-7 ">
                Excellence in animation begins at our doorstep. Be part of
                <span className="text-[#FFC862] font-bold">
                  #1 IT Bootcamp in Indonesia
                </span>
                , where industry mentors shape your future
              </p>
              <RoundedPrimaryButton className="px-5 py-3 font-poppins mt-14">
                Mulai Perjalanan Karirmu
              </RoundedPrimaryButton>
            </>
          )}
        </div>
        <div className="flex-[2] justify-end lg:flex hidden">
          <SkeletonLoader
            visible={isLoading ? isLoading : false}
            width={450}
            height={450}
            variant="circle-image"
          />
          {!isLoading && (
            <Image
              alt="hero image"
              className="block object-contain"
              src={'/img/landing/hero-landing.png'}
              width={620}
              height={523}
            />
          )}
        </div>
      </div>
      <div className="xl:relative xl:top-[-2rem]">
        <SkeletonLoader
          visible={isLoading ? isLoading : false}
          width={'35%'}
          containerStyle={{
            marginLeft: 175,
            marginTop: 0,
          }}
        />
        {!isLoading && (
          <h4 className="font-poppins font-normal text-base md:text-lg lg:text-xl container text-white mt-5 xl:mt-0">
            Bagaimana Talentnesia membantu meraih{' '}
            <span className="font-bold text-2xl">Karir Impianmu</span>
          </h4>
        )}
      </div>
    </section>
  );
};

export default HeroSectionView;
