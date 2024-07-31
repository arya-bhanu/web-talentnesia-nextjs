import Image from 'next/image';
import React from 'react';
import { IProgramDimension } from './programDimensionCard.type';

const ProgramDimensionCard = (props: IProgramDimension) => {
  return (
    <div className="p-2 flex flex-col md:items-start items-center md:p-3 lg:p-5 hover:bg-[#EFF8FF] transition">
      <Image
        alt="image card"
        src={props.imgUrl}
        width={50}
        height={50}
        className="object-cover rounded-full"
      />
      <h4 className="font-inter mt-2 sm:mt-5 md:mt-9 lg:mt-12 sm:text-base text-sm">
        {props.title}
      </h4>
    </div>
  );
};

export default ProgramDimensionCard;
