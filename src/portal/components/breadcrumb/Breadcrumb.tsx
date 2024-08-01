'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { BreadcrumbView } from './Breadcrumb.view';

export const Breadcrumb: React.FC = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return <BreadcrumbView pathSegments={pathSegments} />;
};
