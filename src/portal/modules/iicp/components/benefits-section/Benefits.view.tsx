import React from 'react';
import clsx from 'clsx';
import { benefitsData } from './benefits.data';

export const BenefitsView = ({ className }: { className?: string }) => {
  return (
    <section className={clsx(className, (className = 'bg-white'))}>
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:text-left">
        <div className="w-[40%] mb-6 lg:mb-0 lg:pr-2 mr-8">
          <h1 className="font-bold text-2xl lg:text-3xl mb-8 font-poppins">
            Mengapa harus IICP?
          </h1>
          <p className="text-base mb-4 break-words">
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
        <div className="w-[55%] grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefitsData.map((benefit, index) => (
            <div key={index} className="mb-6">
              <h2 className="font-semibold text-2xl text-center md:text-left mb-4 font-poppins">
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
