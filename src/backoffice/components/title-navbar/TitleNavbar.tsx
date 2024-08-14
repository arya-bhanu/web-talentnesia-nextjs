'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { TitleNavbarView } from './TitleNavbar.view';
import { TitleNavbarViewProps } from './titleNavbar.type';
import { customTitles } from './titleNavbar.data';

export const TitleNavbar: React.FC<TitleNavbarViewProps> = (props) => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  
  const filteredSegments = pathSegments.filter(segment => segment.toLowerCase() !== 'backoffice');

  const lastSegment = filteredSegments[filteredSegments.length - 1];
  const fullPath = filteredSegments.join('/');

  const getCustomOrFormattedTitle = (segment: string, path: string) => {
    if (customTitles[path]) {
      return customTitles[path];
    }
    if (customTitles[segment]) {
      return customTitles[segment];
    }
    return segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formattedTitle = getCustomOrFormattedTitle(lastSegment, fullPath);

  return (
    <TitleNavbarView
      {...props}
      title={formattedTitle || ''}
    />
  );
};