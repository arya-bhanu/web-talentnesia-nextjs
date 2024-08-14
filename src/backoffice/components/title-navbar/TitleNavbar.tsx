'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { TitleNavbarView } from './TitleNavbar.view';
import { TitleNavbarViewProps, CustomTitles } from './titleNavbar.type';
import { getCustomTitle } from '@/backoffice/components/global-customization/globalCustomizations';

export const TitleNavbar: React.FC<TitleNavbarViewProps & { customTitles?: CustomTitles }> = ({ customTitles = {}, ...props }) => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  
  const filteredSegments = pathSegments.filter(segment => segment.toLowerCase() !== 'backoffice');

  const lastSegment = filteredSegments[filteredSegments.length - 1];
  const fullPath = filteredSegments.join('/');

  const getCustomOrFormattedTitle = (segment: string, path: string) => {
    const customTitle = getCustomTitle(path) || getCustomTitle(segment) || customTitles[path] || customTitles[segment];
    if (customTitle) return customTitle;
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
