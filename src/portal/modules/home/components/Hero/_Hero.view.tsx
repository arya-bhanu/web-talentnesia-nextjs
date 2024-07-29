import RoundedPrimaryButton from '@/portal/components/RoundedPrimaryButton';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

const HeroSectionView = ({ className }: { className?: string }) => {
	return (
		<section className={clsx(className, 'bg-primary min-h-screen')}>
			<div className='flex container pt-24'>
				<div className='flex-[1]'>
					<h1 className='font-semibold text-white font-poppins text-5xl leading-[58px]'>
						Elevate Your IT Career with Industry Pioneers
					</h1>
					<p className='text-white text-base font-normal font-inter leading-6 mt-7 '>
						Excellence in animation begins at our doorstep. Be part of
						<span className='text-[#FFC862] font-bold'>
							#1 IT Bootcamp in Indonesia
						</span>
						, where industry mentors shape your future
					</p>
					<RoundedPrimaryButton className='px-5 py-2.5 font-poppins mt-14'>
						Mulai Perjalanan Karirmu
					</RoundedPrimaryButton>
				</div>
				<div className='flex-[2] flex justify-end '>
					<Image
						alt='hero image'
						className='block w-fit'
						src={'/img/landing/hero-landing.png'}
						width={620}
						height={523}
					/>
				</div>
			</div>
			<h4 className='font-poppins font-normal text-xl container text-white'>
				Bagaimana Talentnesia membantu meraih{' '}
				<span className='font-bold'>Karir Impianmu</span>
			</h4>
		</section>
	);
};

export default HeroSectionView;
