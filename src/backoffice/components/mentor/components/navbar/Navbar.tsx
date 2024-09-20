'use client';

import React, { useState } from 'react';
import NavbarView from './Navbar.view';
import { User, NavbarState } from './navbar.type';

interface NavbarProps {
  user: User;
  moduleRoutePath: string;
}

const Navbar: React.FC<NavbarProps> = ({ user, moduleRoutePath }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navbarState: NavbarState = { user, isMenuOpen };

  return (
    <NavbarView
      {...navbarState}
      toggleMenu={toggleMenu}
      moduleRoutePath={moduleRoutePath}
    />
  );
};

export default Navbar;
