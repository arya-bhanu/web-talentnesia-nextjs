'use client';

import React, { CSSProperties, useState } from 'react';
import NavbarView from './Navbar.view';
import { User, NavbarState } from './navbar.type';

interface NavbarProps {
  user: User;
  style?: CSSProperties;
  moduleRoutePath: string;
}

const Navbar: React.FC<NavbarProps> = ({ user, style, moduleRoutePath }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navbarState: NavbarState = { user, isMenuOpen };

  return (
    <NavbarView
      {...navbarState}
      toggleMenu={toggleMenu}
      style={style}
      moduleRoutePath={moduleRoutePath}
    />
  );
};

export default Navbar;
