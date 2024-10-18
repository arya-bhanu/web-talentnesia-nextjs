import FeatureCard from '@/skripsi/home/components/feature-card/FeatureCard';
import React from 'react';
import { EliteClassSectionViewProps } from './eliteClass.type';
import SkeletonLoader from '@/portal/components/skeleton-animation';

const EliteClassSectionView: React.FC<EliteClassSectionViewProps> = ({
  className,
  courses,
  isLoading
}) => {
  return (
    <section className={className}>
      <SkeletonLoader visible={isLoading ? isLoading : false} width={320} height={35} containerStyle={{marginBottom: 10}}/>
      <SkeletonLoader visible={isLoading ? isLoading : false} width={800}/>
      {
        !isLoading && 
        <>
        <h2 className="font-poppins font-semibold md:text-start text-center text-xl md:text-2xl lg:text-3xl">
          Kelas Unggulan Kami
        </h2>
        <p className="font-inter text-center md:text-start text-base md:text-lg lg:text-xl mt-1 md:mt-3">
          Program pilihan yang memberikan Kamu{' '}
          <strong>pelatihan interaktif dan peluang pekerjaan yang menarik</strong>
        </p>
        </>
      }
      
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 md:mt-7 lg:mt-9 gap-10">
        {courses.map((course, index: number) => (
          <FeatureCard key={index} {...course} isLoading={isLoading ? isLoading : false}/>
        ))}
      </div>
    </section>
  );
};

export default EliteClassSectionView;
