'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { BreadcrumbViewProps } from './breadcrumb.type';
import { usePathname, useSearchParams } from 'next/navigation';
import { useBreadCrumbStore } from './breadcrumb.store';

export const BreadcrumbView: React.FC<BreadcrumbViewProps> = ({
  pathSegments,
  formattedSegments,
  className,
  currentPath,
  moduleRoutePath,
}) => {
  const pathName = usePathname();
  const params = useSearchParams();
  const queryParams = new URLSearchParams();

  const { setParamsQueries, paramsQueries } = useBreadCrumbStore();
  useEffect(() => {
    const paramsArr: { key: string; value: string }[] = [];
    for (const [key, value] of params.entries()) {
      paramsArr.push({ key, value });
    }
    setParamsQueries(paramsArr);
  }, [pathName, JSON.stringify(params)]);

  const renderComponent = useMemo(
    () =>
      pathSegments.map((segment, index) => {
        const path = `/${moduleRoutePath}/${pathSegments.slice(0, index + 1).join('/')}`;

        paramsQueries.forEach(({ key, value }) => {
          queryParams.set(key, value);
        });

        const pathWithQueries = `${path}?${queryParams}`;
        const isLast = index === pathSegments.length - 1;
        const displayName = formattedSegments[index];
        return (
          <React.Fragment key={path}>
            {isLast ? (
              <li className="font-semibold text-[#219EBC]">
                {currentPath || displayName}
              </li>
            ) : (
              <li className="flex items-center text-[#989FAD]">
                <Link href={pathWithQueries} className="hover:underline">
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
      }),
    [
      JSON.stringify(paramsQueries),
      JSON.stringify(pathSegments),
      JSON.stringify(moduleRoutePath),
      JSON.stringify(formattedSegments),
    ],
  );
  return (
    <nav
      aria-label="breadcrumb"
      className={clsx(className, 'font-poppins text-sm')}
    >
      <div className="">
        <ol className="flex text-sm md:text-md text-[#989FAD] items-center">
          {renderComponent}
        </ol>
      </div>
    </nav>
  );
};
