'use client';
import React from 'react';
import FooterView from './Footer.view';
import { dataNavs } from './footer.data';
import { useFetch } from '@/skripsi/hooks/useFetch';

const Footer = ({ className }: { className?: string }) => {
  const url = process.env.NEXT_PUBLIC_API_SKRIPSI_URL;
  const { data, loading, error } = useFetch(`${url}/cms/home/footer/social-media` || '');
  return (
    <FooterView
      data={data}
      error={error}
      loading={loading}
      className={className}
      dataNavs={dataNavs}
    />
  );
};

export default Footer;
