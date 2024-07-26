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
				'relative bg-[#E0F7FA] py-16 px-12 rounded-3xl flex'
			)}
		>
			<div className='flex-[1] relative'>
				<figure className='absolute bottom-0 bg-[#0097A7] rounded-b-3xl rounded-t-2xl left-5'>
					<Image
						alt='user story photo'
						src={'/img/landing/student.png'}
						width={200}
						height={230}
						className='h-[230px] object-cover'
					/>
					<div className='flex bg-white px-5 py-4 rounded-b-2xl font-inter gap-4'>
						<figcaption className='font-bold'>Kevin Alvaro</figcaption>
						<p className='text-[#667085] font-normal'>Student</p>
					</div>
				</figure>
			</div>
			<div className='font-inter flex-[3]'>
				<span>
					<strong className='text-[#0097A7] flex items-center gap-x-4 font-bold'>
						<span>
							<div className='w-6 border-b-2 border-[#0097A7]' />
						</span>
						<span>Cerita Inspiratif Peserta Program Kami</span>
					</strong>
				</span>
				<p className='mt-6'>
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
