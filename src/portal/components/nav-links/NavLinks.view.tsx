import Link from 'next/link';
import React from 'react';
import { ILink } from './navLinks.type';
import SkeletonLoader from '../skeleton-animation';

const NavLinksView = ({ title, links, isLoading }: { title: string; links: ILink[], isLoading?: boolean }) => {
  return (
    <div className="font-inter">
      <h4 className="font-semibold text-[#2D2D2D]">{title}</h4>
      <nav className="flex flex-col gap-0.5 md:gap-1.5 mt-1 md:mt-3">
        {links.map((link, index) => (
          <>
          <SkeletonLoader visible={isLoading ? isLoading : false} height={10}/>
          {
            !isLoading &&
            <>
            <Link
              href={link.link}
              key={index}
              className="text-[#5B5B5B] font-medium text-sm"
            >
              {link.label}
            </Link>
            </>
          }
          </>
        ))}
      </nav>
    </div>
  )
};

export default NavLinksView;
