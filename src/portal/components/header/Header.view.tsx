import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '../search-bar/Searchbar';
import Dropdown from '../dropdown/Dropdown';
import { Sling as Hamburger } from 'hamburger-react';
import clsx from 'clsx';
import { HeaderViewProps } from './header.type';
import { programLinks } from '../dropdown/dropdown.data';
import { getSession } from '@/lib/action';

const HeaderView = ({ isTopView, headerObserver }: HeaderViewProps) => {
  const [userRole, setUserRole] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session && session.isLoggedIn) {
        setUserRole(session.role ?? null);
      }
    };
    checkSession();
  }, []);

  const getDashboardLink = () => {
    switch (userRole) {
      case 1:
        return '/backoffice/dashboard';
      case 2:
        return '/operator/dashboard';
      case 3:
        return '/mentor/dashboard';
      default:
        return '/';
    }
  };

  return (
    <header
      className={clsx(
        'py-2 px-1 lg:p-3 flex items-center gap-3 fixed top-0 bg-white w-full z-50 shadow-lg transition-all',
        !isTopView && headerObserver.inView
          ? '-translate-y-20'
          : 'translate-y-0',
      )}
    >
      <div className="flex items-center gap-x-8 lg:gap-x-14 xl:gap-x-24 w-full lg:w-fit">
        <Link href={'/'} className="w-fit flex items-center gap-1 md:gap-3">
          <Image
            alt="logo image"
            src={'/logo.png'}
            width={60}
            height={60}
            className="w-10 md:w-14 h-11 md:h-12 object-cover"
          />
          <h1 className="font-medium text-2xl md:text-3xl font-khand">
            talentnesia
          </h1>
        </Link>
        <SearchBar
          placeHolder="Jelajahi Kursus"
          className="w-full md:max-w-60 lg:max-w-80 md:flex hidden pointer"
        />
      </div>
      <nav
        className={clsx(
          'lg:flex hidden items-center w-[60%] 2xl:w-[50%] ml-auto justify-end gap-2 lg:gap-3 xl:gap-8',
          { block: isMenuOpen, hidden: !isMenuOpen },
        )}
      >
        <Dropdown links={programLinks}>Program</Dropdown>
        <Link
          href={'/contact'}
          className="font-inter font-medium lg:text-base text-sm"
        >
          Kontak Kami
        </Link>
        <Link
          href={'/blog'}
          className="font-inter font-medium lg:text-base text-sm hover:text-blue-600"
        >
          Blog
        </Link>
        <div className="flex items-center gap-2 lg:gap-3">
          {userRole ? (
            <Link
              className="px-4 lg:px-5 xl:px-8 py-1.5 lg:py-2 xl:py-3 border border-[#D0D5DD] bg-[#FFC862] rounded-full font-inter font-semibold"
              href={getDashboardLink()}
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                className="px-4 lg:px-5 xl:px-8 py-1.5 lg:py-2 xl:py-3 border border-[#D0D5DD] rounded-full font-inter font-semibold"
                href={'/auth/register'}
              >
                Daftar
              </Link>
              <Link
                className="px-4 lg:px-5 xl:px-8 py-1.5 lg:py-2 xl:py-3 border border-[#D0D5DD] bg-[#FFC862] rounded-full font-inter font-semibold"
                href={'/auth/login'}
              >
                Masuk
              </Link>
            </>
          )}
        </div>
      </nav>
      <span className="block lg:hidden relative">
        <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} />
      </span>
      <div
        className={clsx(
          'fixed top-0 left-0 bg-white shadow-lg border border-gray-200 rounded-lg p-4 transition-transform h-screen',
          { 'translate-x-0': isMenuOpen, '-translate-x-full': !isMenuOpen },
        )}
        style={{ width: '250px' }}
      >
        {/* Responsive */}
        <div className="flex items-center gap-1 md:gap-3 mb-6">
          <Image
            alt="logo image"
            src={'/logo.png'}
            width={60}
            height={60}
            className="w-10 md:w-14 h-11 md:h-12 object-cover"
          />
          <h1 className="font-medium text-2xl md:text-3xl font-khand">
            talentnesia
          </h1>
        </div>
        <nav className="space-y-4">
          <Dropdown links={programLinks}>
            <span className="block text-sm font-medium hover:text-blue-600">
              Program
            </span>
          </Dropdown>
          <Link
            href={'/contact'}
            className="block text-sm font-medium hover:text-blue-600"
          >
            Kontak Kami
          </Link>
          <Link
            href={'/blog'}
            className="block text-sm font-medium hover:text-blue-600"
          >
            Blog
          </Link>
          <div className="mt-4 space-y-2">
            {userRole ? (
              <Link
                className="block text-sm font-medium hover:text-blue-600"
                href={getDashboardLink()}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  className="block px-4 py-2 border border-[#D0D5DD] rounded-full font-inter font-semibold text-lg hover:text-blue-600"
                  href={'/auth/register'}
                >
                  Daftar
                </Link>
                <Link
                  className="block px-4 py-2 border border-[#D0D5DD] bg-[#FFC862] rounded-full font-inter font-semibold text-lg hover:text-blue-600"
                  href={'/auth/login'}
                >
                  Masuk
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default HeaderView;
