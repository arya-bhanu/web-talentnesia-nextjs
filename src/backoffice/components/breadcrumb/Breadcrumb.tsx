'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { BreadcrumbView } from './Breadcrumb.view';
import { BreadcrumbViewProps } from './breadcrumb.type';

export const Breadcrumb: React.FC<BreadcrumbViewProps> = (props) => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  // Ambil dua segmen terakhir untuk ditampilkan
  const lastSegments = pathSegments.slice(-2);

  // Format segmen hanya untuk tampilan
  const formattedSegments = lastSegments.map(
    (segment) =>
      segment
        .replace(/-/g, ' ') // Mengganti "-" dengan " "
        .replace(/\b\w/g, (char) => char.toUpperCase()), // Membuat huruf awal setiap kata menjadi kapital
  );

  return (
    <BreadcrumbView
      {...props}
      pathSegments={lastSegments} // Kirim segmen asli untuk digunakan dalam href
      formattedSegments={formattedSegments} // Kirim segmen yang diformat untuk tampilan
    />
  );
};
