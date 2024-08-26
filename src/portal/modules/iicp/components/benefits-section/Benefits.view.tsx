import React from 'react';
import clsx from 'clsx';
import { benefitsData } from './benefits.data';
import SkeletonLoader from '@/portal/components/skeleton-animation';

export const BenefitsView = ({ className, isLoading }: { className?: string, isLoading?: boolean }) => {
  return (
    <section className={clsx(className, (className = 'bg-white'))}>
      <div className="flex flex-col lg:flex-row lg:items-start lg:text-left">
        <div className="w-full lg:w-[40%] mb-6 lg:mb-0 lg:pr-2 lg:mr-8 text-center md:text-left">
          <SkeletonLoader visible={isLoading ? isLoading : false} height={30} width={'60%'} containerStyle={{marginBottom: 40}} />
          <SkeletonLoader visible={isLoading ? isLoading : false} height={10} width={'90%'} />
          <SkeletonLoader visible={isLoading ? isLoading : false} height={10} width={'88%'} />
          <SkeletonLoader visible={isLoading ? isLoading : false} height={10} width={'92%'}/>
          <SkeletonLoader visible={isLoading ? isLoading : false} height={10} width={'65%'} containerStyle={{marginBottom: 30}}/>
          <SkeletonLoader visible={isLoading ? isLoading : false} height={10} width={'95%'} />
          <SkeletonLoader visible={isLoading ? isLoading : false} height={10} width={'20%'} />
          {
            !isLoading &&
            <>
            <h1 className="font-bold text-2xl lg:text-3xl mb-8 font-poppins">
              Mengapa harus IICP?
            </h1>
            <p className="text-base mb-4">
              Melalui serangkaian program mulai dari Pre-Program hingga
              Post-Program, IICP membantu kualifikasi lulusan sekolah atau kampus
              sesuai dengan kebutuhan Industri terkini dan meningkatkan angka
              keterserapan alumni.
            </p>
            <p className="text-base">
              IICP memberikan pengajaran hingga sertifikasi keahlian berstandar
              Internasional.
            </p>
            </>
          }
          
          
          
        </div>
        <div className="w-full lg:w-[55%] grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
          {benefitsData.map((benefit, index) => (
            <div key={index} className="mb-6">
              <SkeletonLoader visible={isLoading ? isLoading : false} width={'50%'} height={23} containerStyle={{marginBottom: 16}}/>
              <SkeletonLoader visible={isLoading ? isLoading : false} height={10} width={'70%'} />
              <SkeletonLoader visible={isLoading ? isLoading : false} height={10} width={'70%'} />
              {
                !isLoading &&
                <>
                <h2 className="font-semibold text-2xl mb-4 font-poppins">
                  {benefit.title}
                </h2>
                <p className="text-base">{benefit.description}</p>
                </>
              }
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsView;
