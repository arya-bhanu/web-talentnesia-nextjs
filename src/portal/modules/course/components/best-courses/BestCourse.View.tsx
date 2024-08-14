import FeatureCard from '@/portal/components/feature-card/FeatureCard';
import React from 'react';
import { BestCourseSectionViewProps } from './bestCourse.type';

const BestCourseSectionView: React.FC<BestCourseSectionViewProps> = ({
  className,
  courses,
}) => {
  return (
    <section className={className}>
      <h2 className="font-poppins font-semibold text-slate-800 md:text-start text-center text-xl md:text-2xl lg:mt-24 lg:text-3xl">
        Rekomendasi Kursus terbaik untuk anda
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 md:mt-7 lg:mt-9 gap-10">
        {courses.map((course, index: number) => (
          <FeatureCard key={index} {...course} />
        ))}
      </div>
    </section>
  );
};

export default BestCourseSectionView;
