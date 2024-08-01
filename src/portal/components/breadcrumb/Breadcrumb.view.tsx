'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BreadcrumbViewProps } from './breadcrumb.type';

export const BreadcrumbView: React.FC<BreadcrumbViewProps> = ({
  pathSegments,
}) => {
  return (
    <nav aria-label="breadcrumb" className="font-inter mb-5">
      <div className="mb-4">
        <ol className="flex text-md text-gray-700 items-center space-x-2">
          <li className="flex items-center">
            <Link href="/" className="hover:underline text-[#667085]">
              Home
            </Link>
          </li>
          {pathSegments.length > 0 && (
            <span className="mx-1 text-[#667085]">
              <Image
                src={"/icons/arrow-right.svg"}
                alt="Chevron Right"
                width={18}
                height={18}
                className="inline rotate-[-90deg]"
              />
            </span>
          )}
          {pathSegments.map((segment, index) => {
            const path = '/' + pathSegments.slice(0, index + 1).join('/');
            const isLast = index === pathSegments.length - 1;
            const displayName =
              segment.charAt(0).toUpperCase() + segment.slice(1);

            return (
              <React.Fragment key={path}>
                {isLast ? (
                  <li className="font-bold text-gray-900">{displayName}</li>
                ) : (
                  <li className="flex items-center text-[#667085]">
                    <Link href={path} className="hover:underline">
                      {displayName}
                    </Link>
                    <span className="mx-1">
                      <Image
                        src={'/icons/arrow-right.svg'}
                        alt=""
                        width={18}
                        height={18}
                        className="inline"
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
