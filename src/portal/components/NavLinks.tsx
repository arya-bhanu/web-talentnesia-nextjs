import Link from 'next/link';
import React from 'react';

export interface ILink {
	label: string;
	link: string;
}
const NavLinks = ({ title, links }: { title: string; links: ILink[] }) => {
	return (
		<div className='font-inter'>
			<h4 className='font-semibold text-[#2D2D2D]'>{title}</h4>
			<nav className='flex flex-col gap-1.5 mt-3'>
				{links.map((link, index) => (
					<Link
						href={link.link}
						key={index}
						className='text-[#5B5B5B] font-medium text-sm'
					>
						{link.label}
					</Link>
				))}
			</nav>
		</div>
	);
};

export default NavLinks;
