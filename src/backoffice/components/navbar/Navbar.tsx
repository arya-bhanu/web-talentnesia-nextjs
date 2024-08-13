'use client';

import React, { useState, useEffect } from 'react';
import NavbarView from './Navbar.view';
import { User, NavbarState } from './navbar.type';

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    profilePicture: '',
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users/2',
          {
            cache: 'force-cache',
          },
        );
        const data = await response.json();
        setUser({
          name: data.name,
          email: data.email,
          profilePicture: `https://i.pravatar.cc/150?u=${data.email}`,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navbarState: NavbarState = { user, isMenuOpen };

  return <NavbarView {...navbarState} toggleMenu={toggleMenu} />;
};

export default Navbar;
