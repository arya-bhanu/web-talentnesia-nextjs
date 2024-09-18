import React, { useState } from 'react';
import FeatureCard from '@/portal/components/feature-card/FeatureCard';
import { PopularCoursesSectionViewProps } from './popularCourse.type';
import SkeletonLoader from '@/portal/components/skeleton-animation';

const PopularCoursesSectionView: React.FC<PopularCoursesSectionViewProps> = ({ className, courses, isLoading }) => {
  const [visibleCourses, setVisibleCourses] = useState(2);

  const showMoreCourses = () => {
    setVisibleCourses(prevVisible => Math.min(prevVisible + courses.length));
  };

  const showLessCourses = () => {
    setVisibleCourses(2);
  };

  return (
    <section className={className}>
      <SkeletonLoader visible={isLoading ? isLoading : false} width={'20%'} height={35} containerStyle={{marginBottom: 20, marginTop: 68}}/>
      {
        !isLoading &&
        <h2 className="font-poppins font-semibold text-slate-800 md:text-start text-center text-xl md:text-2xl lg:mt-20 lg:text-3xl">
          Kursus Serupa
        </h2>
      }
      
      <div className="grid grid-cols-2 gap-6 w-1/2 mt-4">
      { 
        courses.slice(0, visibleCourses).map((course, index: number) => (
          <FeatureCard key={index} {...course} isLoading={isLoading ? isLoading : false}/>
        ))
      }
      </div>
      <div className="mt-8 text-left">
        {visibleCourses < courses.length ? (
          <button 
            className="w-1/2 bg-white border border-[#FFC862] text-black py-2 px-4 rounded-full"
            onClick={showMoreCourses}
          >
            Lihat Selengkapnya
          </button>
        ) : (
          <button 
            className="w-1/2 bg-white border border-[#FFC862] text-black py-2 px-4 rounded-full"
            onClick={showLessCourses}
          >
            Lihat Lebih Sedikit
          </button>
        )}
      </div>
    </section>
  );
};

export default PopularCoursesSectionView;
