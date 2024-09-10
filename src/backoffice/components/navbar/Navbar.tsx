'use client';

import React, { CSSProperties, useState } from 'react';
import NavbarView from './Navbar.view';
import { User, NavbarState } from './navbar.type';

interface NavbarProps {
  user: User;
  style?: CSSProperties;
}

const Navbar: React.FC<NavbarProps> = ({ user, style }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navbarState: NavbarState = { user, isMenuOpen };

  return <NavbarView {...navbarState} toggleMenu={toggleMenu} style={style} />;
};

export default Navbar;