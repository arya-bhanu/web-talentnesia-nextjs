import Image from 'next/image';
import React from 'react';
import { Programs } from './programDimensionCard.type';

const ProgramDimensionCardView = ({ img_icon, title }: Programs) => {
  return (
    <div className="p-2 flex flex-col md:items-start items-center md:p-3 lg:p-5 hover:bg-[#EFF8FF] transition">
      <Image
        alt={'program icon'}
        src={img_icon}
        width={50}
        height={50}
        className="object-cover rounded-full"
      />
      <h4 className="font-inter mt-2 sm:mt-5 md:mt-9 lg:mt-12 sm:text-base text-sm">
        {title}
      </h4>
    </div>
  );
};

export default ProgramDimensionCardView;
