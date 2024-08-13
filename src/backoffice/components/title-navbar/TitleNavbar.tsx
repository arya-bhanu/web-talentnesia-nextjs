'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { TitleNavbarView } from './TitleNavbar.view';
import { TitleNavbarViewProps } from './titleNavbar.type';

export const TitleNavbar: React.FC<TitleNavbarViewProps> = (props) => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').filter(Boolean).pop();

  // Format lastSegment sesuai dengan permintaan
  const formattedTitle = lastSegment
    ?.replace(/-/g, ' ') // Mengganti "-" dengan " "
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Membuat huruf awal setiap kata menjadi kapital

  return <TitleNavbarView {...props} title={formattedTitle || ''} />;
};
