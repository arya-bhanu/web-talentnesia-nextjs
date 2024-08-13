import React from 'react';
import ProgramDimensionCard from '@/portal/components/program-dimension-card/ProgramDimensionCard';
import RoundedPrimaryButton from '@/portal/components/rounded-primary-button/RoundedPrimaryButton';
import { ProgramDimensionSectionViewProps } from './programDimension.type';

const ProgramDimensionSectionView: React.FC<
  ProgramDimensionSectionViewProps
> = ({ className, programs }) => {
  return (
    <section className={className}>
      <h2 className="font-poppins md:text-start text-center font-semibold text-xl md:text-2xl lg:text-3xl">
        Temukan Program Sesuai Minatmu
      </h2>
      <div className="mt-4 md:mt-7 lg:mt-10 flex gap-6 md:gap-7 lg:gap-10 md:flex-row flex-col flex-wrap">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 flex-[3] gap-0 sm:gap-2 md:gap-5">
          {programs.map((program) => (
            <ProgramDimensionCard key={program.logo} {...program} />
          ))}
        </div>
        <div className="bg-[#E0F7FA] rounded-[8px] w-fit px-3 lg:px-4 xl:px-7 py-4 md:py-6 lg:py-8 flex-1 flex flex-col justify-between">
          <div className="max-w-[90%]">
            <h3 className="font-poppins text-center md:text-start font-semibold text-xl">
              Mulai Karir Impianmu dari Sini
            </h3>
            <p className="font-inter text-sm mt-2 md:mt-5 text-center md:text-start">
              Jelajahi seluruh course yang ada di Talentnesia dan temukan course
              terbaik sesuai minatmu, mulai dari sini!
            </p>
          </div>
          <RoundedPrimaryButton className="py-2 md:py-3 w-fit px-3 lg:px-4 xl:px-7 gap-4 mt-3 md:mx-0 mx-auto">
            Jelajahi Sekarang
          </RoundedPrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default ProgramDimensionSectionView;
