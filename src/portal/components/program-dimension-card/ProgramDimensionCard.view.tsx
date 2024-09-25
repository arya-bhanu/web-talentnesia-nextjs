import Image from 'next/image';
import React from 'react';
import { Programs } from './programDimensionCard.type';

const ProgramDimensionCardView = ({ logo, title, url }: Programs) => {
  const logoUrl = logo && typeof logo === 'string' && logo.startsWith('http')
    ? logo
    : `${process.env.API_SERVER_URL}/v1/file/${logo || ''}`;

  return (
    <div className="p-2 flex flex-col md:items-start items-center md:p-3 lg:p-5 hover:bg-[#EFF8FF] transition">
      <Image
        alt={title || 'Program logo'}
        src={logoUrl}
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