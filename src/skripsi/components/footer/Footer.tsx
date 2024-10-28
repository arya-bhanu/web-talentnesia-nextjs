'use client';
import React, { use } from 'react';
import FooterView from './Footer.view';
import { dataNavs } from './footer.data';
import { useQuery } from '@tanstack/react-query';
import { fetchSocialMediaLink } from './api/footer.api';

const Footer = ({ className }: { className?: string }) => {
  const query = useQuery({
    queryKey: ['social'],
    queryFn: fetchSocialMediaLink,
  });
  return <FooterView query={query} className={className} dataNavs={dataNavs} />;
};

export default Footer;
