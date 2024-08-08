import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Partners } from './partnersCarousel.type';

const PartnersCarousel = ({
  className,
  headingText = 'Partner Kolaborasi Bantu Mewujudkan Karir Impianmu',
  partners,
}: {
  className?: string;
  headingText?: string;
  partners: Partners[];
}) => {
  return (
    <div className={className}>
      <h2 className="font-poppins font-semibold md:text-start text-center text-xl md:text-2xl lg:text-3xl max-w-xl leading-7 md:leading-8 lg:leading-10">
        {headingText}
      </h2>
      <div className="mt-5 md:mt-16 lg:mt-20 flex items-center flex-wrap justify-center gap-1 sm:gap-3 lg:justify-between mx-auto">
        {partners.map((partner, index: number) => (
          <Link href={partner.link || '/'} key={index}>
            <Image
              alt="partner image"
              src={partner.logo}
              width={120}
              height={30}
              className="w-20 sm:w-24 md:w-32 h-9 sm:h-10 md:h-14 object-contain"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PartnersCarousel;
