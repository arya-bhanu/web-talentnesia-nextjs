import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { ProgramProps } from './program.type';
import { programData } from './program.data';
import SkeletonLoader from '@/portal/components/skeleton-animation';

const ProgramItem = ({
  logoprogram,
  title,
  description,
  course,
  check,
  isLoading
}: ProgramProps) => (
  <div className="bg-white rounded-3xl shadow-sm p-8 border-[#D0D3D9] border flex flex-col">
    <div className="flex mb-4 items-center">
      <SkeletonLoader visible={isLoading ? isLoading : false} width={48} height={48} variant='image' containerStyle={{marginRight: 16}} />
      <SkeletonLoader visible={isLoading ? isLoading : false} width={'55%'} height={30} />
      {
        !isLoading &&
        <>
        <Image
          src={logoprogram}
          alt={title}
          width={48}
          height={48}
          className="rounded-sm mr-4"
        />
        <h2 className="font-semibold text-xl font-poppins">{title}</h2>
        </>
      }
      
      
    </div>
    <SkeletonLoader visible={isLoading ? isLoading : false} height={10} width={'90%'} />
    <SkeletonLoader visible={isLoading ? isLoading : false} height={10} width={'90%'} />
    <SkeletonLoader visible={isLoading ? isLoading : false} height={10} width={'90%'} />
    <SkeletonLoader visible={isLoading ? isLoading : false} height={10} width={'90%'} />
    <SkeletonLoader visible={isLoading ? isLoading : false} height={10} width={'90%'} />
    <SkeletonLoader visible={isLoading ? isLoading : false} height={10} width={'90%'} containerStyle={{marginBottom: 25}} />
    <SkeletonLoader visible={isLoading ? isLoading : false} width={'40%'} containerStyle={{marginBottom: 16}}/>
    {
      !isLoading && 
      <>
      <p className="text-gray-700 mb-4 whitespace-pre-line">{description}</p>
      <h3 className="font-semibold text-lg mb-4">Program ini menyediakan :</h3>
      </>
      
    }
    
      <ul className="space-y-4">
        {course.map((item, index) => (
          <li key={index} className="text-gray-700 flex items-center ">
            <SkeletonLoader visible={isLoading ? isLoading : false} variant='circle-image' width={25} height={25} containerStyle={{marginRight: 16}}/>
            <SkeletonLoader visible={isLoading ? isLoading : false} width={'20%'} />
            {
              !isLoading && 
              <>
              <Image
                src={check}
                alt={check}
                width={25}
                height={25}
                className="mr-4"
              />
              {item}
              </>
            }
            
            
          </li>
        ))}
      </ul>
  </div>
);

export const ProgramView = ({ className, isLoading }: { className?: string, isLoading?: boolean }) => {
  return (
    <section className={clsx(className, (className = 'bg-white'))}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {programData.map((program, index) => (
          <ProgramItem key={index} {...program} isLoading={isLoading} />
        ))}
      </div>
    </section>
  );
};
