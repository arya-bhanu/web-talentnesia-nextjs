import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { Partners } from './partners.type';

export const PartnerView = ({
  className,
  partners,
}: {
  className?: string;
  partners: Partners[];
}) => {
  return (
    <section className={clsx(className, (className = 'bg-white'))}>
      <div className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left">
        <div className="w-full lg:w-1/3 mb-6 lg:mb-0 lg:pr-2">
          <h2 className="font-semibold text-[#2B2E33] font-poppins text-xl mb-4">
            Telah Dipercaya Oleh
          </h2>
          <p className="text-[#2B2E33] text-base font-normal font-inter">
            Program IICP telah diimplementasikan di beberapa sekolah berikut
          </p>
        </div>
        <div className="w-full flex justify-center lg:justify-end items-center">
          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-6">
            {partners.map((partner, index: number) => (
              <Link href={partner.link || '/'} key={index}>
                <Image
                  alt="partner image"
                  src={partner.logo}
                  width={120}
                  height={30}
                  className="w-20 md:w-28 h-9 md:h-20 object-contain"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
