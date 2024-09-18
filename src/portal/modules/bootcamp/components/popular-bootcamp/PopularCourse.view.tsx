import FeatureCard from '@/portal/components/feature-card/FeatureCard';
import React from 'react';
import SkeletonLoader from '@/portal/components/skeleton-animation';
import { courses } from '@/portal/components/feature-card/featureCard.type';

const PopularCoursesSectionView = ({ className, courses, isLoading }: { className?: string, courses: courses[], isLoading?: boolean }) => {
  return (
    <section className={className}>
      <SkeletonLoader visible={isLoading ? isLoading : false} width={'40%'} height={35} containerStyle={{ marginBottom: 20, marginTop: 112 }} />
      {
        !isLoading &&
        <h2 className="font-poppins font-semibold text-slate-800 md:text-start text-center text-xl md:text-2xl lg:mt-28 lg:text-3xl">
          Rekomendasi Bootcamp Terpopuler
        </h2>
      }

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 md:mt-7 lg:mt-9 gap-10">
        {
          courses.map((course, index: number) => (
            <FeatureCard key={index} {...course} isLoading={isLoading ? isLoading : false} />
          ))
        }
      </div>
    </section>
  );
};

export default PopularCoursesSectionView;
