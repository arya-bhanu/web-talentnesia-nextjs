import Link from 'next/link';
import React from 'react';
import { ILink } from './navLinks.type';

const NavLinksView = ({ title, links }: { title: string; links: ILink[] }) => {
  return (
    <div className="font-inter">
      <h4 className="font-semibold text-[#2D2D2D]">{title}</h4>
      <nav className="flex flex-col gap-0.5 md:gap-1.5 mt-1 md:mt-3">
        {links.map((link, index) => (
          <Link
            href={link.link}
            key={index}
            className="text-[#5B5B5B] font-medium text-sm"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default NavLinksView;
