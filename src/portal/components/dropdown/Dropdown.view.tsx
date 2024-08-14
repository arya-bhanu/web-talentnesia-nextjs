import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DropdownViewProps } from './dropdown.type';

export const DropdownView: React.FC<DropdownViewProps> = ({
  children,
  links,
  isOpen,
  toggleDropdown,
}) => {
  return (
    <div className="relative">
      <button
        className="flex items-center lg:gap-1 xl:gap-2 group"
        onClick={toggleDropdown}
      >
        <span className="font-inter font-medium lg:text-base text-sm">
          {children}
        </span>
        <Image
          alt="arrow icon"
          src={'/icons/arrow-right.svg'}
          width={18}
          height={18}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="absolute bg-white border border-gray-200 mt-2 rounded-md shadow-lg z-50 w-48 lg:w-56">
          <ul className="py-1">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
