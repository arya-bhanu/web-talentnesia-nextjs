import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';

export const ContactView = ({ className }: { className?: string }) => {
  return (
    <section className={clsx(className, 'bg-white py-8')}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3">
            <h1 className="text-xl md:text-2xl font-semibold mb-6 font-poppins">
              Ingin sekolahmu mengimplementasikan program IICP?
            </h1>
            <p className="text-gray-700">
              Hubungi kami lebih lanjut untuk bergabung program IICP
            </p>
          </div>
          <Link href={'#'}>
            <button className="bg-[#FFC862] rounded-3xl py-2 px-6 flex items-center space-x-2 hover:bg-[#f7b939] transition-colors mt-4 md:mt-0">
              <Image
                src={'/icons/whatsapp.svg'}
                alt="Whatsapp icon"
                height={30}
                width={30}
                className="cursor-pointer"
              />
              <span>Contact Now</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
