'use client';
import { ObserverContext } from '@/utils/portal/ObserverProvider';
import clsx from 'clsx';
import { Breadcrumb } from '@/portal/components/breadcrumb';
import Image from 'next/image';
import React, { useContext } from 'react';
import SkeletonLoader from '@/portal/components/skeleton-animation';

const CourseHeroView = ({ className, isLoading }: { className?: string, isLoading?: boolean }) => {
  const { headerObserver } = useContext(ObserverContext);
  return (
    <section
      ref={headerObserver.observerRef}
      className={clsx(
        className,
        'bg-[#e0f7fc] min-h-[70vh] lg:min-h-[70vh]',
      )}
    >
      <div className="flex container pt-20 md:pt-28 lg:pt-30 xl:pt-35">
        <div className="flex-[2] flex flex-col items-start gap-6"> 
          <SkeletonLoader visible={isLoading ? isLoading : false} width={'23%'} height={25} />
          <SkeletonLoader visible={isLoading ? isLoading : false} height={40} containerStyle={{ marginTop: 56 }} />
          <SkeletonLoader visible={isLoading ? isLoading : false} height={40} width={'45%'} containerStyle={{ marginBottom: 40 }} />

          {!isLoading && (
            <>
              <Breadcrumb pathSegments={['']} />
              <h1 className="font-semibold text-[#241C4D] font-poppins mt-4 mb-4 text-2xl md:text-3xl lg:text-3xl xl:text-4xl xl:leading-[58px]">
                Animasi 3D For Beginners
              </h1>
              <p className="text-slate-700 mb-4 max-w-[35rem]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </>
          )}

          <div className="flex gap-4"> 
            <div className="bg-[#219EBC] w-[180px] h-[40px] rounded-lg flex items-center justify-center">
              <div className="flex flex-col items-center gap-1">
                <SkeletonLoader
                  visible={isLoading ? isLoading : false}
                  width={140}
                  height={70}
                  borderRadius={8}
                  containerStyle={{ margin: 0 }}
                />
                {!isLoading && (
                  <div className="flex items-center gap-2">
                    <p className="text-white text-sm">Kategori:</p>
                    <p className="text-white font-bold text-sm">Animasi 3D</p>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-[#219EBC] w-[180px] h-[40px] rounded-lg flex items-center justify-center">
              <div className="flex flex-col items-center gap-1">
                <SkeletonLoader
                  visible={isLoading ? isLoading : false}
                  width={140}
                  height={70}
                  borderRadius={8}
                  containerStyle={{ margin: 0 }}
                />
                {!isLoading && (
                  <div className="flex items-center gap-2">
                    <p className="text-white text-sm">Level:</p>
                    <p className="text-white font-inter font-bold text-sm">Beginner</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4"> 
            <p className="text-black text-base font-medium">4.8</p>
            {[...Array(5)].map((_, index) => (
              <Image key={index} src="/icons/star.svg" alt="Star" width={16} height={16} />
            ))}
            <p className="text-black text-base font-medium">3.456</p>
            <p className="text-black text-base font-medium">Students</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseHeroView;
