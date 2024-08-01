import React from 'react';
import clsx from 'clsx';
import { benefitsData } from './benefits.data';

export const BenefitsView = ({ className }: { className?: string }) => {
  return (
    <section className={clsx(className, (className = 'bg-white'))}>
      <div className="flex flex-col lg:flex-row lg:items-start lg:text-left">
        <div className="w-full lg:w-[40%] mb-6 lg:mb-0 lg:pr-2 lg:mr-8 text-center md:text-left">
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
        </div>
        <div className="w-full lg:w-[55%] grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
          {benefitsData.map((benefit, index) => (
            <div key={index} className="mb-6">
              <h2 className="font-semibold text-2xl mb-4 font-poppins">
                {benefit.title}
              </h2>
              <p className="text-base">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsView;
