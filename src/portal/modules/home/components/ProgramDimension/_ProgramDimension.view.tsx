import Image from 'next/image';
import React from 'react';
import ProgramDimensionCard, {
	IProgramDimension,
} from '@/portal/components/ProgramDimensionCard';
import RoundedPrimaryButton from '@/portal/components/RoundedPrimaryButton';

const programs: IProgramDimension[] = [
	{ title: 'Illustration', imgUrl: '/img/landing/illustration.svg' },
	{ imgUrl: '/img/landing/illustration-b.svg', title: 'Illustration' },
	{ imgUrl: '/img/landing/dimensi-3.svg', title: 'Dimensi 3' },
	{ imgUrl: '/img/landing/dimensi-3-d.svg', title: 'Dimensi 3' },
	{
		imgUrl: '/img/landing/dimensi-3-c.svg',
		title: 'Dimensi 3',
	},
	{
		imgUrl: '/img/landing/dimensi-3-b.svg',
		title: 'Dimensi 3',
	},
	{
		imgUrl: '/img/landing/dimensi-2.svg',
		title: 'Dimensi 2',
	},
	{
		imgUrl: '/img/landing/animasi.svg',
		title: 'Animasi',
	},
];
const ProgramDimensionSectionView = ({ className }: { className?: string }) => {
	return (
		<section className={className}>
			<h2 className='font-poppins md:text-start text-center font-semibold text-xl md:text-2xl lg:text-3xl'>
				Temukan Program Sesuai Minatmu
			</h2>
			<div className='mt-4 md:mt-7 lg:mt-10 flex gap-4 md:gap-7 lg:gap-10 md:flex-row flex-col flex-wrap'>
				<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 flex-[3] gap-0 sm:gap-2 md:gap-5'>
					{programs.map((program) => (
						<ProgramDimensionCard
							key={program.imgUrl}
							{...program}
						/>
					))}
				</div>
				<div className='bg-[#E0F7FA] rounded-[8px] w-fit px-4 md:px-5 lg:px-7 py-4 md:py-6 lg:py-8 flex-1 flex flex-col justify-between'>
					<div className='max-w-[90%]'>
						<strong className='font-poppins font-semibold text-xl'>
							Mulai Karir Impianmu dari Sini
						</strong>
						<p className='font-inter text-sm mt-2 md:mt-5'>
							Jelajahi seluruh course yang ada di Talentnesia dan temukan course
							terbaik sesuai minatmu, mulai dari sini!
						</p>
					</div>
					<RoundedPrimaryButton className='py-2 md:py-3 w-fit px-3 md:px-5 lg:px-7 gap-4 mt-2'>Jelajahi Sekarang</RoundedPrimaryButton>
				</div>
			</div>
		</section>
	);
};

export default ProgramDimensionSectionView;
