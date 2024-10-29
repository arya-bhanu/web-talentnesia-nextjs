import React from 'react';
import FooterView from './Footer.view';
import { dataNavs } from './footer.data';

const Footer = async ({ className }: { className?: string }) => {
  let data = await fetch(`${process.env.API_SKRIPSI}/cms/footer/social-media`, {
    next: { tags: ['footer'] },
  });
  let posts = await data.json();
  return (
    <FooterView data={posts.body} className={className} dataNavs={dataNavs} />
  );
};

export default Footer;
