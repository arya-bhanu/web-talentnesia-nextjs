import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { featuresData } from './features.data';
import SkeletonLoader from '@/portal/components/skeleton-animation';

export const FeaturesView = ({
  className,
  isLoading,
}: {
  className?: string;
  isLoading?: boolean;
}) => {
  return (
    <section className={clsx(className, 'bg-white px-4 sm:px-6 lg:px-8')}>
      <div className="flex flex-col lg:flex-row lg:items-start lg:text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 items-start">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col text-center sm:text-left min-h-[100px] items-center sm:items-start mb-8 sm:mb-0"
            >
              <SkeletonLoader
                visible={isLoading ?? false}
                variant="image"
                width={55}
                height={55}
                containerStyle={{ marginBottom: 16 }}
              />
              <SkeletonLoader
                visible={isLoading ?? false}
                width={'70%'}
                containerStyle={{ marginBottom: 12 }}
              />
              <SkeletonLoader
                visible={isLoading ?? false}
                height={10}
                width={'100%'}
              />
              <SkeletonLoader
                visible={isLoading ?? false}
                height={10}
                width={'95%'}
              />

              {!isLoading && (
                <>
                  <Image
                    alt={feature.title}
                    src={feature.imgUrl}
                    width={38}
                    height={38}
                    className="mb-4 sm:mb-6"
                  />
                  <div>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesView;
