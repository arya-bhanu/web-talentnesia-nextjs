import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DropdownViewProps } from './dropdown.type';

export const DropdownView: React.FC<DropdownViewProps> = ({
  children,
  links,
  isOpen,
  toggleDropdown,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 300); 
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    toggleDropdown();
  }, [toggleDropdown]);

  return (
    <div 
      className="relative" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="flex items-center lg:gap-1 xl:gap-2 group"
        onClick={handleClick}
      >
        <span className="font-inter font-medium lg:text-base text-sm">
          {children}
        </span>
        <Image
          alt="arrow icon"
          src={'/icons/arrow-right.svg'}
          width={18}
          height={18}
          className={`transition-transform ${(isOpen || isHovered) ? 'rotate-180' : ''}`}
        />
      </button>
      {(isOpen || isHovered) && (
        <div 
          className="absolute bg-white border border-gray-200 mt-2 rounded-md shadow-lg z-50 w-48 lg:w-56"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
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