import React from 'react';
import { EliteClassSectionViewProps } from './eliteClass.type';
import FeatureCard from '../feature-card';

const EliteClassSectionView: React.FC<EliteClassSectionViewProps> = ({
  className,
  dataApi,
}) => {
  return (
    <section className={className}>
      <h2 className="font-poppins font-semibold md:text-start text-center text-xl md:text-2xl lg:text-3xl">
        {dataApi.heading}
      </h2>
      <p className="font-inter text-center md:text-start text-base md:text-lg lg:text-xl mt-1 md:mt-3">
        {dataApi.subheading}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 md:mt-7 lg:mt-9 gap-10">
        {dataApi.class.map((course, index: number) => {
          const { number, ...rest } = course;
          return <FeatureCard key={index} {...rest} number={index} />;
        })}
      </div>
    </section>
  );
};

export default EliteClassSectionView;
