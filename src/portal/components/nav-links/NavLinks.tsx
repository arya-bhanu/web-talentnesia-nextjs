import React from 'react';
import NavLinksView from './NavLinks.view';
import { ILink } from './navLinks.type';

const NavLinks = ({ title, links }: { title: string; links: ILink[] }) => {
  return <NavLinksView title={title} links={links} />;
};

export default NavLinks;
