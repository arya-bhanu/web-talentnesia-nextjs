'use client';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';
import ButtonCarousel from './ButtonCarousel';

const UserStoryCard = ({ className }: { className?: string }) => {
	const [activeNumber, setActiveNumber] = useState(0);
	return (
		<div
			className={clsx(
				className,
				'relative bg-[#E0F7FA] py-5 md:py-10 lg:py-12  xl:py-16 px-5 lg:px-7 xl:px-12 rounded-3xl flex lg:flex-row flex-col gap-5 lg:gap-7'
			)}
		>
			<div className='flex-[1] relative'>
				<figure className=' static lg:absolute bottom-0 bg-[#0097A7] rounded-b-3xl rounded-t-2xl left-0 xl:left-5 lg:flex-row flex-col lg:items-start items-center'>
					<Image
						alt='user story photo'
						src={'/img/landing/student.png'}
						width={200}
						height={230}
						className='h-[190px] lg:h-[210px] xl:h-[230px] object-cover block w-fit mx-auto'
					/>
					<div className='flex bg-white px-3 sm:px-5 py-2 sm:py-4 rounded-b-2xl font-inter gap-1 xl:gap-4 flex-wrap'>
						<figcaption className='font-bold sm:text-base text-sm'>Kevin Alvaro</figcaption>
						<p className='text-[#667085]  sm:text-base text-sm font-normal'>Student</p>
					</div>
				</figure>
			</div>
			<div className='font-inter flex-[3]'>
				<strong className='text-[#0097A7] text-sm md:text-base flex items-center gap-x-4 font-bold'>
					<span>
						<div className='w-6 border-b-2 border-[#0097A7]' />
					</span>
					<span>Cerita Inspiratif Peserta Program Kami</span>
				</strong>
				<p className=' mt-2 md:mt-4 lg:mt-6 md:text-base text-xs sm:text-sm'>
					“Mengandalkan kuliah saja, tidak cukup. Dengan Talentnesia, saya
					mantap tinggalkan dunia gaming lantas belajar dunia Animasi yang
					ternyata menyenangkan. Yang nomor satu, Talentnesia mengajarkan ilmu
					berorientasi kerja. Kini saya sangat terbantu dalam karir saya.”
				</p>
				<ButtonCarousel
					activeNumber={activeNumber}
					nButton={4}
					setActiveNumber={setActiveNumber}
					className='mt-6'
				/>
			</div>
		</div>
	);
};

export default UserStoryCard;
