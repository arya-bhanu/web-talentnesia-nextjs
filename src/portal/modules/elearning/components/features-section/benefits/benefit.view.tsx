import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { benefitsData } from './benefit.data';
import SkeletonLoader from '@/portal/components/skeleton-animation';

export const BenefitsView = ({
  className,
  isLoading,
}: {
  className?: string;
  isLoading?: boolean;
}) => {
  return (
    <section
      className={clsx(className, 'px-4 sm:px-5 lg:px-0')}
      style={{ backgroundColor: '#f5f9ff' }}
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:text-left lg:pb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 lg:gap-10 items-start">
          {benefitsData.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col text-center sm:text-left min-h-[100px] items-center sm:items-start p-4 sm:p-0"
            >
              <SkeletonLoader
                visible={isLoading ? isLoading : false}
                variant="image"
                width={55}
                height={55}
                containerStyle={{ marginBottom: '16px sm:mb-24' }}
              />
              <SkeletonLoader
                visible={isLoading ? isLoading : false}
                width={'70%'}
                containerStyle={{ marginBottom: '12px sm:mb-20' }}
              />

              <SkeletonLoader
                visible={isLoading ? isLoading : false}
                height={10}
                width={'100%'}
              />
              <SkeletonLoader
                visible={isLoading ? isLoading : false}
                height={10}
                width={'95%'}
              />
              <div className={isLoading ? 'w-full' : ''}>
                {!isLoading && (
                  <>
                    <Image
                      alt={feature.title}
                      src={feature.imgUrl}
                      width={38}
                      height={38}
                      className="mb-4 sm:mb-6 mx-auto sm:mx-0"
                    />
                    <div className="mb-0">
                      <h3 className="font-semibold text-base sm:text-lg mb-2 font-poppins">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsView;
