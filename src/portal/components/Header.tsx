"use client"
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import SearchBar from './Searchbar';
import Dropdown from './Dropdown';
import { Sling as Hamburger } from 'hamburger-react';

const Header = () => {
	return (
		<header className='py-2 px-1 lg:p-3 flex items-center gap-3'>
			<div className='flex items-center gap-x-8 lg:gap-x-14 xl:gap-x-24 w-full lg:w-fit'>
				<Link
					href={'/'}
					className='w-fit flex items-center gap-1 md:gap-3'
				>
					<Image
						alt='logo image'
						src={'/logo.png'}
						width={60}
						height={60}
						className=' w-10 md:w-14 h-11 md:h-12 object-cover '
					/>
					<h1 className='font-medium text-2xl md:text-3xl font-khand'>
						talentnesia
					</h1>
				</Link>
				<SearchBar
					placeHolder='Jelajahi Kursus'
					className='w-full md:max-w-60 lg:max-w-80 md:flex hidden'
				/>
			</div>
			<nav className=' lg:flex hidden items-center w-[70%] xl:w-[50%] ml-auto justify-end gap-2 lg:gap-3 xl:gap-8'>
				<Dropdown>Kategori</Dropdown>
				<Dropdown>Program</Dropdown>
				<Dropdown>Kontak Kami</Dropdown>
				<div className='flex items-center gap-2 lg:gap-3'>
					<Link
						className='px-4 lg:px-5 xl:px-8 py-1.5 lg:py-2 xl:py-3 border border-[#D0D5DD] rounded-full font-inter font-semibold'
						href={'/register'}
					>
						Daftar
					</Link>
					<Link
						className='px-4 lg:px-5 xl:px-8 py-1.5 lg:py-2 xl:py-3 border border-[#D0D5DD] bg-[#FFC862] rounded-full font-inter font-semibold'
						href={'/login'}
					>
						Masuk
					</Link>
				</div>
			</nav>
			<Hamburger />
		</header>
	);
};

export default Header;
