import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Partners } from './partnersCarousel.type';
import SkeletonLoader from '../skeleton-animation';

const PartnersCarousel = ({
  className,
  headingText = 'Partner Kolaborasi Bantu Mewujudkan Karir Impianmu',
  partners,
  isLoading,
}: {
  className?: string;
  headingText?: string;
  partners: Partners[];
  isLoading?: boolean;
}) => {
  return (
    <div className={className}>
      <SkeletonLoader
        visible={isLoading ? isLoading : false}
        width={380}
        height={35}
      />
      <SkeletonLoader
        visible={isLoading ? isLoading : false}
        width={450}
        height={35}
      />
      {!isLoading && (
        <>
          <h2 className="font-poppins font-semibold md:text-start text-center text-xl md:text-2xl lg:text-3xl max-w-xl leading-7 md:leading-8 lg:leading-10">
            {headingText}
          </h2>
        </>
      )}

      <div className="mt-5 md:mt-16 lg:mt-20 flex items-center flex-wrap justify-center gap-1 sm:gap-3 lg:justify-between mx-auto">
        {partners.map((partner, index: number) => (
          <>
            <SkeletonLoader
              visible={isLoading ? isLoading : false}
              variant="image"
              width={120}
              height={120}
            />
            {!isLoading && (
              <Link href={partner.link || '/'} key={index}>
                {partner.logo && (
                  <Image
                    alt="partner image"
                    src={partner.logo}
                    width={120}
                    height={30}
                    className="w-20 sm:w-24 md:w-32 h-9 sm:h-10 md:h-14 object-contain"
                  />
                )}
              </Link>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default PartnersCarousel;
