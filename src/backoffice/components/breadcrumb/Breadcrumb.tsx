'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { BreadcrumbView } from './Breadcrumb.view';
import { BreadcrumbViewProps } from './breadcrumb.type';
import { customBreadcrumbs } from './breadcrumb.data';

export const Breadcrumb: React.FC<BreadcrumbViewProps> = (props) => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  const filteredSegments = pathSegments.filter(segment => segment.toLowerCase() !== 'backoffice');

  const getCustomOrFormattedName = (segment: string, fullPath: string) => {
    if (customBreadcrumbs[fullPath]) {
      return customBreadcrumbs[fullPath];
    }
    if (customBreadcrumbs[segment]) {
      return customBreadcrumbs[segment];
    }
    return segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Format segmen yang tersisa
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