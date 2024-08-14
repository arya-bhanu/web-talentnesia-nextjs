'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Breadcrumb } from '@/backoffice/components/breadcrumb'; // Asumsi Breadcrumb sudah diimport dari file yang benar
import { NavbarState } from './navbar.type';
import { TitleNavbar } from '../title-navbar';

interface NavbarViewProps extends NavbarState {
  toggleMenu: () => void;
}

const NavbarView: React.FC<NavbarViewProps> = ({ user, isMenuOpen, toggleMenu }) => {
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  const toggleNotification = () => {
    setNotificationOpen(!isNotificationOpen);
  };

  return (
    <nav className="fixed top-0 z-40 w-full bg-[#FAFAFA] dark:bg-gray-800 dark:border-gray-700" style={{ paddingLeft: '16rem' }}>
      <div className="flex justify-between items-center py-4 px-6">
        <div>
          <TitleNavbar />
          <Breadcrumb pathSegments={['']} className='' formattedSegments={['']}/>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative flex items-center">
            {/* Icon Notifikasi */}
            <div className="relative flex items-center">
              <button onClick={toggleNotification} className="flex items-center focus:outline-none">
                <Image
                  src="/icons/sidebar/notification.svg"
                  alt="Notification"
                  width={24}
                  height={24}
                  className="mr-4"
                />
              </button>
              {/* Popup Notifikasi */}
              {isNotificationOpen && (
                <div className="absolute right-0 top-full mt-1 w-64 bg-white shadow-md rounded-md p-4 z-50">
                  <ul className="space-y-2">
                    <li className="text-gray-800 text-base text-center">You have 3 new notifications</li>
                    <li className="text-gray-700 text-sm">System update available</li>
                    <li className="text-gray-700 text-sm">Meeting at 3 PM</li>
                    <li className="text-gray-700 text-sm">New comment on your post</li>
                  </ul>
                </div>
              )}
            </div>

            {/* User Profile */}
            <button onClick={toggleMenu} className="flex items-center focus:outline-none">
              <div className="relative flex items-center space-x-2 bg-[#FFFFFF] p-2 rounded-lg shadow-sm">
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src={user.profilePicture || "/images/placeholderProfilePicture.png"}
                    alt="User"
                    width={30}
                    height={30}
                  />
                </div>
                <span className="text-gray-800 text-sm font-medium truncate">{user.name}</span>
                <Image
                  src="/icons/arrow-right.svg"
                  alt="Dropdown Arrow"
                  width={16}
                  height={16}
                />
              </div>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white shadow-md rounded-md p-2 z-50">
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 cursor-pointer rounded-md p-2 text-sm">
                    Profile
                  </li>
                  <li className="flex items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 cursor-pointer rounded-md p-2 text-sm">
                    Settings
                  </li>
                  <li className="flex items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 cursor-pointer rounded-md p-2 text-sm">
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarView;
