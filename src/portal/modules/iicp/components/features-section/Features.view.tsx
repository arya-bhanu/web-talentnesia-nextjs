import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { featuresData } from './features.data';
import SkeletonLoader from '@/portal/components/skeleton-animation';

export const FeaturesView = ({ className, isLoading }: { className?: string, isLoading?: boolean }) => {
  return (
    <section className={clsx(className, (className = 'bg-white'))}>
      <div className="flex flex-col lg:flex-row lg:items-start lg:text-left ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col text-center md:text-left min-h-[100px] items-center md:items-start"
            >
              <SkeletonLoader visible={isLoading ? isLoading : false} variant='image' width={55} height={55} containerStyle={{marginBottom: 24}}/>
              <SkeletonLoader visible={isLoading ? isLoading : false} width={'70%'} containerStyle={{marginBottom: 20}} />
              <SkeletonLoader visible={isLoading ? isLoading : false} height={10} width={'100%'} />
              <SkeletonLoader visible={isLoading ? isLoading : false} height={10} width={'95%'} />
              <div style={isLoading === true ? {minWidth: 700} : undefined}>
                {
                  !isLoading &&
                  <>
                  <Image
                    alt={feature.title}
                    src={feature.imgUrl}
                    width={38}
                    height={38}
                    className="mb-6"
                  />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 font-poppins">
                      {feature.title}
                    </h3>
                    <p className="text-base">{feature.description}</p>
                  </div>
                  </>
                }
                
                
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesView;
