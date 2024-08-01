import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';

export const ContactView = ({ className }: { className?: string }) => {
  return (
    <section className={clsx(className, 'bg-white py-8')}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold mb-4">
            Ingin sekolahmu mengimplementasikan program IICP?
          </h1>
          <p className="text-gray-700">
            Hubungi kami lebih lanjut untuk bergabung program IICP
          </p>
        </div>
        <Link href={'#'}>
          <button className="bg-[#FFC862] rounded-3xl py-2 px-6 flex items-center space-x-2 hover:bg-[#f7b939] transition-colors">
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
    </section>
  );
};
