import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import SearchBar from './Searchbar';
import Dropdown from './Dropdown';

const Header = () => {
	return (
		<header className='p-3 flex items-center'>
			<div className='flex items-center gap-x-24'>
				<Link
					href={'/'}
					className='w-fit flex items-center gap-3'
				>
					<Image
						alt='logo image'
						src={'/logo.png'}
						width={60}
						height={60}
						className='w-14 h-12 object-cover '
					/>
					<h1 className='font-medium text-3xl font-khand'>talentnesia</h1>
				</Link>
				<SearchBar
					placeHolder='Jelajahi Kursus'
					className='w-full max-w-80'
				/>
			</div>
			<nav className='flex items-center w-[50%] ml-auto justify-end gap-8'>
				<Dropdown>Kategori</Dropdown>
				<Dropdown>Program</Dropdown>
				<Dropdown>Kontak Kami</Dropdown>
				<div className='flex items-center gap-3'>
					<Link
						className='px-8 py-3 border border-[#D0D5DD] rounded-full font-inter font-semibold'
						href={'/register'}
					>
						Daftar
					</Link>
					<Link
						className='px-8 py-3 border border-[#D0D5DD] bg-[#FFC862] rounded-full font-inter font-semibold'
						href={'/login'}
					>
						Masuk
					</Link>
				</div>
			</nav>
		</header>
	);
};

export default Header;
