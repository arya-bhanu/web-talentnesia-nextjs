import React from 'react';
import FooterView from './Footer.view';
import { dataNavs } from './footer.data';

const Footer = ({ className }: { className?: string }) => {
  return <FooterView className={className} dataNavs={dataNavs} />;
};

export default Footer;
