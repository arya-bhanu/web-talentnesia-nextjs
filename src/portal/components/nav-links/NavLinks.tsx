import React from 'react';
import NavLinksView from './NavLinks.view';
import { ILink } from './navLinks.type';

const NavLinks = ({ title, links, isLoading }: { title: string; links: ILink[], isLoading?: boolean }) => {
  return <NavLinksView title={title} links={links} isLoading={isLoading} />;
};

export default NavLinks;
