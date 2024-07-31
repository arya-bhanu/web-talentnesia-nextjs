import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import SocialMedia from '../social-media';
import LogoCompany from '../../../../public/logo-company.svg';
import NavLinks from '../nav-links';
import Arrow from '../../../../public/icons/arrow-right-sharp.svg';
import { ILink } from '../nav-links/NavLinks';

const dataNavs = [
  {
    title: 'ABOUT US',
    links: [
      {
        label: 'Tentang Kami',
        link: 'tentang-kami',
      },
      {
        label: 'FAQ',
        link: 'faq',
      },
    ] as ILink[],
  },
  {
    title: 'OUR PROGRAM',
    links: [
      {
        label: 'E-Learning',
        link: 'e-learning',
      },
      {
        label: 'Bootcamp',
        link: 'bootcamp',
      },
      {
        label: 'IICP',
        link: 'iicp',
      },
    ] as ILink[],
  },
  {
    title: 'MORE',
    links: [
      {
        label: 'Privacy Policy',
        link: 'privacy-policy',
      },
      {
        label: 'Term and Condition',
        link: 'term-and-condition',
      },
      {
        label: 'Cookies',
        link: 'cookies',
      },
      {
        label: 'Blog',
        link: 'blog',
      },
      {
        label: 'Career',
        link: 'career',
      },
    ] as ILink[],
  },
];
const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={clsx(className, 'py-4 md:py-9 lg:py-12')}>
      <div className="container flex justify-between md:flex-row flex-col gap-3 md:gap-0">
        <div>
          <Link href={'/'}>
            <LogoCompany />
          </Link>
          <SocialMedia className="mt-3 sm:mt-5 lg:mt-7" />
          <p className="mt-3 sm:mt-4 font-inter text-[#999999] text-sm">
            Copyright 2023 Talentnesia - All Right Reserved
          </p>
        </div>
        <div className=" w-full md:w-1/2 ">
          <div className="flex items-start gap-4 sm:gap-5 md:gap-x-12 lg:gap-x-20 flex-wrap">
            {dataNavs.map((dataNav, index) => (
              <NavLinks key={index} {...dataNav} />
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between mt-3 md:mt-10 lg:mt-12 pt-2 sm:pt-4 md:pt-6 border-t border-t-[#E7E9EE] gap-3">
            <div>
              <h4 className="text-[#00B3AD] font-semibold">GABUNG KOMUNITAS</h4>
              <p className="text-[#2D2D2D] text-sm font-semibold mt-1 md:mt-2">
                Jadi Bagian dari Komunitas Animasi Terbesar di Indonesia
              </p>
            </div>
            <button className="flex items-center gap-2 md:text-base text-sm rounded-full  px-3 md:px-6 py-1 md:py-2.5 border border-[#E7E9EE]">
              <span>Visit Here</span>
              <Arrow />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
