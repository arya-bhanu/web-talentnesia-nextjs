'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { BreadcrumbView } from './Breadcrumb.view';
import { BreadcrumbViewProps } from './breadcrumb.type';

export const Breadcrumb = (props: BreadcrumbViewProps) => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);


  return (
    <BreadcrumbView
      {...props}
      pathSegments={pathSegments}
    />
  );
};
