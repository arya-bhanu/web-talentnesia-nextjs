import React, { ChangeEvent, useEffect, useState } from 'react';
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

  const [onMouseIn, setMouseIn] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const handleOnMouseIn = () => {setMouseIn(true)};
  const handleOnMouseOut = () => {
    if(searchValue === '') {
      setMouseIn(false);
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
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
      <div className="flex items-center gap-x-8 lg:gap-x-14 xl:gap-x-16 w-full lg:w-fit" style={onMouseIn ? {width: '37%'} : undefined}>
        <Link href={'/'} className="w-fit flex items-center gap-1 md:gap-3">
          <Image
            alt="logo image"
            src={'/logo.png'}
            width={60}
            height={60}
            className=" w-10 md:w-14 h-11 md:h-12 object-cover "
          />
          <h1 className="font-medium text-2xl md:text-3xl font-khand">
            talentnesia
          </h1>
        </Link>
        <div className='flex-grow p-0'>
          <SearchBar
            placeHolder="Jelajahi Kursus"
            className="w-full md:flex hidden pointer "
            onMouseIn={handleOnMouseIn}
            onMouseOut={handleOnMouseOut}
            value={searchValue}
            onChangeInput={handleInputChange}
            mouseValue={onMouseIn}
          />
        </div>
        
      </div>
      <nav className=" lg:flex hidden items-center w-[60%] 2xl:w-[50%] ml-auto justify-end gap-2 lg:gap-3 xl:gap-8">
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
      <span className="block lg:hidden">
        <Hamburger />
      </span>
    </header>
  );
};

export default HeaderView;
