'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Breadcrumb } from '@/backoffice/components/breadcrumb';
import { NavbarState } from './navbar.type';
import { TitleNavbar } from '../title-navbar';
import {
  globalCustomTitles,
  globalCustomBreadcrumbs,
} from '@/backoffice/components/global-customization/globalCustomizations';
import { Button, Modal } from 'flowbite-react';
import { logout, getSession } from '@/lib/action';
import { SessionData } from '@/lib/lib';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface NavbarViewProps extends NavbarState {
  toggleMenu: () => void;
  moduleRoutePath: string;
}

const NavbarView: React.FC<NavbarViewProps> = ({
  user,
  isMenuOpen,
  toggleMenu,
  style,
  moduleRoutePath,
}) => {
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [sessionData, setSessionData] = useState<Partial<SessionData> | null>(
    null,
  );
  const { setUser } = useAuth();
  const router = useRouter();

  const toggleNotification = () => {
    setNotificationOpen(!isNotificationOpen);
  };

  const handleProfileClick = async () => {
    const session = await getSession();
    setSessionData(session);
    setShowProfileModal(true);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    const result = await logout();
    if (result.redirectTo) {
      setUser && setUser(null);
      setShowLogoutModal(false);
      router.push(result.redirectTo);
    }
  };

  return (
    <nav
      className={`fixed top-0 z-40 w-full bg-[#FAFAFA] dark:bg-gray-800 transition-all duration-300 dark:border-gray-700 ${
        isMenuOpen ? 'pl-64' : 'pl-20'
      }`}
      style={style}
    >
      <div className="flex justify-between items-center py-4 px-6">
        <div>
          <TitleNavbar customTitles={globalCustomTitles} />
          <Breadcrumb
            customBreadcrumbs={globalCustomBreadcrumbs}
            className=""
            pathSegments={[]}
            formattedSegments={[]}
            moduleRoutePath={moduleRoutePath}
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative flex items-center">
            <div className="relative flex items-center">
              <button
                onClick={toggleNotification}
                className="flex items-center focus:outline-none"
              >
                <Image
                  src="/icons/sidebar/notification.svg"
                  alt="Notification"
                  width={24}
                  height={24}
                  className="mr-4"
                />
              </button>
              {isNotificationOpen && (
                <div className="absolute right-0 top-full mt-1 w-64 bg-white shadow-md rounded-md p-4 z-50">
                  <ul className="space-y-2">
                    <li className="text-gray-800 text-base text-center">
                      You have 3 new notifications
                    </li>
                    <li className="text-gray-700 text-sm">
                      System update available
                    </li>
                    <li className="text-gray-700 text-sm">Meeting at 3 PM</li>
                    <li className="text-gray-700 text-sm">
                      New comment on your post
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <button
              onClick={toggleMenu}
              className="flex items-center focus:outline-none"
            >
              <div className="relative flex items-center space-x-2 bg-[#FFFFFF] p-2 rounded-lg shadow-sm">
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src={
                      user?.profilePicture ||
                      `${process.env.API_SERVER_URL}/v1/file/users/2024-08/thumbs/weJJ7Yb2qP7M6N42.jpg`
                    }
                    alt="User"
                    width={30}
                    height={30}
                  />
                </div>
                <span className="text-gray-800 text-sm font-medium truncate">
                  {user?.name || 'User'}
                </span>
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
                  <li
                    onClick={handleProfileClick}
                    className="flex items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 cursor-pointer rounded-md p-2 text-sm"
                  >
                    Profile
                  </li>
                  <Link href={'/backoffice/setting'} className="p-0 m-0 block">
                    <li className="flex items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 cursor-pointer rounded-md p-2 text-sm">
                      Setting
                    </li>
                  </Link>
                  <li
                    onClick={handleLogout}
                    className="flex items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 cursor-pointer rounded-md p-2 text-sm"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal show={showProfileModal} onClose={() => setShowProfileModal(false)}>
        <Modal.Header>User Profile</Modal.Header>
        <Modal.Body>
          {sessionData && (
            <div>
              <p>Name: {sessionData.name}</p>
              <p>Email: {sessionData.email}</p>
              <p>Role: {sessionData.role}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowProfileModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showLogoutModal} onClose={() => setShowLogoutModal(false)}>
        <Modal.Header>Confirm Logout</Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to logout?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={confirmLogout}>
                Yes
              </Button>
              <Button color="gray" onClick={() => setShowLogoutModal(false)}>
                No
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </nav>
  );
};
export default NavbarView;
