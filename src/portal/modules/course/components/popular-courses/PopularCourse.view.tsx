import FeatureCard from '@/portal/components/feature-card/FeatureCard';
import React from 'react';
import { PopularCoursesSectionViewProps } from './popularCourse.type';
import SkeletonLoader from '@/portal/components/skeleton-animation';

const PopularCoursesSectionView: React.FC<PopularCoursesSectionViewProps> = ({ className, courses, isLoading }) => {
  return (
    <section className={className}>
      <SkeletonLoader visible={isLoading ? isLoading : false} width={'20%'} height={35} containerStyle={{marginBottom: 20, marginTop: 68}}/>
      {
        !isLoading &&
        <h2 className="font-poppins font-semibold text-slate-800 md:text-start text-center text-xl md:text-2xl lg:mt-20 lg:text-3xl">
          Popular Kursus
        </h2>
      }
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 md:mt-7 lg:mt-9 gap-10">
        { 
          courses.map((course, index: number) => (
            <FeatureCard 
              key={index} 
              {...course} 
              isLoading={isLoading ? isLoading : false} 
              originPrice={course.originalPrice.toString()} currentPrice={course.currentPrice.toString()} rating={course.rating.toString()}
            />
          ))
        }
      </div>
    </section>
  );
};

export default PopularCoursesSectionView;
