import React, { useState } from 'react';
import FeatureCard from '@/portal/components/feature-card/FeatureCard';
import { PopularCoursesSectionViewProps } from './popularCourse.type';
import SkeletonLoader from '@/portal/components/skeleton-animation';

const PopularCoursesSectionView: React.FC<PopularCoursesSectionViewProps> = ({ className, courses, isLoading }) => {

  return (
    <section className={className}>
      <SkeletonLoader visible={isLoading ? isLoading : false} width={'20%'} height={35} containerStyle={{marginBottom: 20, marginTop: 68}}/>
      {
        !isLoading &&
        <h2 className="font-poppins font-semibold text-slate-800 md:text-start text-center text-lg">
          Kursus Serupa
        </h2>
      }
      
      <div className="grid grid-cols-2 gap-6 w-full mt-4">
      { 
        courses.map((course, index: number) => (
          <FeatureCard key={index} {...course} isLoading={isLoading ? isLoading : true}/>
        ))
      }
      </div>
    </section>
  );
};

export default PopularCoursesSectionView;
