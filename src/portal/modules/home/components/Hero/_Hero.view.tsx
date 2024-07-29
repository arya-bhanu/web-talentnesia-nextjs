import RoundedPrimaryButton from '@/portal/components/RoundedPrimaryButton';
import clsx from 'clsx';
import React from 'react';

const HeroSectionView = ({ className }: { className?: string }) => {
	return (
		<section className={clsx(className, 'bg-primary min-h-screen')}>
			<div className='flex items-stretch container py-24'>
				<div className='flex-[1]'>
					<h1 className='font-semibold text-white font-poppins text-4xl leading-[58px] max-w-[80%]'>
						Elevate Your IT Career with Industry Pioneers
					</h1>
					<p className='text-white text-sm font-normal font-inter leading-6 mt-10 max-w-[80%]'>
						Excellence in animation begins at our doorstep. Be part of
						<span className='text-[#FFC862] font-bold'>
							#1 IT Bootcamp in Indonesia
						</span>
						, where industry mentors shape your future
					</p>
					<RoundedPrimaryButton className='px-5 py-2.5 font-poppins mt-20'>
						Mulai Perjalanan Karirmu
					</RoundedPrimaryButton>
				</div>
				<div className='flex-[2]'></div>
			</div>
			<h4 className='font-poppins font-normal text-xl container text-white'>
				Bagaimana Talentnesia membantu meraih{' '}
				<span className='font-bold'>Karir Impianmu</span>
			</h4>
		</section>
	);
};

export default HeroSectionView;
