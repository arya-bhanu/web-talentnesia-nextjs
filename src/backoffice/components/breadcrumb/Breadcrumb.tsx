'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { BreadcrumbView } from './Breadcrumb.view';
import { BreadcrumbViewProps, CustomBreadcrumbs } from './breadcrumb.type';
import { getCustomBreadcrumb } from '@/backoffice/components/global-customization/globalCustomizations';

export const Breadcrumb: React.FC<BreadcrumbViewProps & { customBreadcrumbs?: CustomBreadcrumbs }> = ({ customBreadcrumbs = {}, ...props }) => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  const filteredSegments = pathSegments.filter(segment => segment.toLowerCase() !== 'backoffice');

  const getCustomOrFormattedName = (segment: string, fullPath: string) => {
    const customName = getCustomBreadcrumb(fullPath) || getCustomBreadcrumb(segment) || customBreadcrumbs[fullPath] || customBreadcrumbs[segment];
    if (customName) return customName;
    return segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formattedSegments = filteredSegments.map((segment, index) => {
    const fullPath = filteredSegments.slice(0, index + 1).join('/');
    return getCustomOrFormattedName(segment, fullPath);
  });

  return (
    <BreadcrumbView
      {...props}
      pathSegments={filteredSegments}
      formattedSegments={formattedSegments}
    />
  );
};
