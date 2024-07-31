import FeatureCard from '@/portal/components/feature-card/FeatureCard';
import React from 'react';
import { datas } from './eliteClass.data';

const EliteClassSectionView = ({ className }: { className?: string }) => {
  return (
    <section className={className}>
      <h2 className="font-poppins font-semibold md:text-start text-center text-xl md:text-2xl lg:text-3xl">
        Kelas Unggulan Kami
      </h2>
      <p className="font-inter text-center md:text-start text-base md:text-lg lg:text-xl mt-1 md:mt-3">
        Program pilihan yang memberikan Kamu{' '}
        <strong>pelatihan interaktif dan peluang pekerjaan yang menarik</strong>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 md:mt-7 lg:mt-9 gap-10">
        {datas.map((feature, index: number) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default EliteClassSectionView;
