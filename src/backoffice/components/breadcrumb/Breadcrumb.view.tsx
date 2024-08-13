'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

interface BreadcrumbViewProps {
  pathSegments: string[];
  formattedSegments: string[];
  className?: string;
  currentPath?: string;
}

export const BreadcrumbView: React.FC<BreadcrumbViewProps> = ({
  pathSegments,
  formattedSegments,
  className,
  currentPath,
}) => {
  const filteredSegments = pathSegments.filter(
    (segment) => segment !== '' && segment.toLowerCase() !== 'backoffice',
  );

  return (
    <nav
      aria-label="breadcrumb"
      className={clsx(className, 'font-poppins text-sm')}
    >
      <div className="">
        <ol className="flex text-md text-[#989FAD] items-center">
          {filteredSegments.map((segment, index) => {
            const path =
              '/' +
              pathSegments
                .slice(0, pathSegments.indexOf(segment) + 1)
                .filter(
                  (seg) => seg !== '' && seg.toLowerCase() !== 'backoffice',
                )
                .join('/');
            const isLast = index === filteredSegments.length - 1;
            const displayName = formattedSegments[index];
            return (
              <React.Fragment key={path}>
                {isLast ? (
                  <li className="font-semibold text-[#219EBC]">
                    <Link href={path} className="hover:underline">
                      {currentPath || displayName}
                    </Link>
                  </li>
                ) : (
                  <li className="flex items-center text-[#989FAD]">
                    <Link href={path} className="hover:underline">
                      {displayName}
                    </Link>
                    <span className="mx-1">
                      <Image
                        src="/icons/arrow-right.svg"
                        alt="arrow right"
                        width={12}
                        height={12}
                        className="rotate-[-90deg] items-center flex w-3 h-3"
                      />
                    </span>
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};
