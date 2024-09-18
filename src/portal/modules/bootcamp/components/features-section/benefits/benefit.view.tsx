import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { benefitsData } from './benefit.data';
import SkeletonLoader from '@/portal/components/skeleton-animation';

export const BenefitsView = ({ className, isLoading }: { className?: string, isLoading?: boolean }) => {
  return (
    <section className={clsx(className, 'px-5 lg:px-0')} style={{backgroundColor: '#f5f9ff'}}>
      <div className="flex flex-col lg:flex-row lg:items-start lg:text-left lg:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10 items-start">
          {benefitsData.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col text-center md:text-left min-h-[100px] items-center md:items-start"
            >
              <SkeletonLoader visible={isLoading ? isLoading : false} variant='image' width={50} height={50} containerStyle={{marginBottom: 20}}/>
              <SkeletonLoader visible={isLoading ? isLoading : false} width={'70%'} containerStyle={{marginBottom: 16}} />
              <SkeletonLoader visible={isLoading ? isLoading : false} height={8} width={'100%'} />
              <SkeletonLoader visible={isLoading ? isLoading : false} height={8} width={'95%'} />
              <div style={isLoading === true ? {minWidth: 200} : undefined}>
                {
                  !isLoading &&
                  <>
                  <Image
                    alt={feature.title}
                    src={feature.imgUrl}
                    width={32}
                    height={32}
                    className="mb-4"
                  />
                  <div>
                    <h3 className="font-semibold text-base mb-2 font-poppins">
                      {feature.title}
                    </h3>
                    <p className="text-sm">{feature.description}</p>
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
export default BenefitsView;