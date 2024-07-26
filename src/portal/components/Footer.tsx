import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import SocialMedia from './SocialMedia';
import LogoCompany from '../../../../../public/logo-company.svg';
import NavLinks, { ILink } from './NavLinks';
import Arrow from '../../../../../public/icons/arrow-right-sharp.svg';

const dataNavs = [
	{
		title: 'ABOUT US',
		links: [
			{
				label: 'Tentang Kami',
				link: 'tentang-kami',
			},
			{
				label: 'FAQ',
				link: 'faq',
			},
		] as ILink[],
	},
	{
		title: 'OUR PROGRAM',
		links: [
			{
				label: 'E-Learning',
				link: 'e-learning',
			},
			{
				label: 'Bootcamp',
				link: 'bootcamp',
			},
			{
				label: 'IICP',
				link: 'iicp',
			},
		] as ILink[],
	},
	{
		title: 'MORE',
		links: [
			{
				label: 'Privacy Policy',
				link: 'privacy-policy',
			},
			{
				label: 'Term and Condition',
				link: 'term-and-condition',
			},
			{
				label: 'Cookies',
				link: 'cookies',
			},
			{
				label: 'Blog',
				link: 'blog',
			},
			{
				label: 'Career',
				link: 'career',
			},
		] as ILink[],
	},
];
const Footer = ({ className }: { className?: string }) => {
	return (
		<footer className={clsx(className, 'py-12')}>
			<div className='container flex justify-between'>
				<div>
					<Link href={'/'}>
						<LogoCompany />
					</Link>
					<SocialMedia className='mt-7' />
					<p className='mt-4 font-inter text-[#999999] text-sm'>
						Copyright 2023 Talentnesia - All Right Reserved
					</p>
				</div>
				<div className='w-1/2 '>
					<div className='flex items-start gap-x-20'>
						{dataNavs.map((dataNav, index) => (
							<NavLinks
								key={index}
								{...dataNav}
							/>
						))}
					</div>
					<div className='flex items-center justify-between mt-12 pt-6 border-t border-t-[#E7E9EE]'>
						<div>
							<h4 className='text-[#00B3AD] font-semibold'>GABUNG KOMUNITAS</h4>
							<p className='text-[#2D2D2D] text-sm font-semibold mt-2'>
								Jadi Bagian dari Komunitas Animasi Terbesar di Indonesia
							</p>
						</div>
						<button className='flex items-center gap-2 rounded-full px-6 py-2.5 border border-[#E7E9EE]'>
							<span>Visit Here</span>
							<Arrow />
						</button>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
