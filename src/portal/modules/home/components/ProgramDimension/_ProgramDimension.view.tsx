import Image from 'next/image';
import React from 'react';
import ProgramDimensionCard, {
	IProgramDimension,
} from '@/portal/components/ProgramDimensionCard';

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
			<h2 className='font-poppins font-semibold text-3xl'>
				Temukan Program Sesuai Minatmu
			</h2>
			<div className='mt-10 flex gap-10'>
				<div className='grid grid-cols-4 flex-[3] gap-5'>
					{programs.map((program) => (
						<ProgramDimensionCard
							key={program.imgUrl}
							{...program}
						/>
					))}
				</div>
				<div className='bg-[#E0F7FA] rounded-[8px] w-fit px-7 py-8 flex-1 flex flex-col justify-between'>
					<div className='max-w-[90%]'>
						<strong className='font-poppins font-semibold text-xl'>
							Mulai Karir Impianmu dari Sini
						</strong>
						<p className='font-inter text-sm mt-5'>
							Jelajahi seluruh course yang ada di Talentnesia dan temukan course
							terbaik sesuai minatmu, mulai dari sini!
						</p>
					</div>
					<button className='flex max-w-[90%] items-center justify-between gap-4 px-7 py-2.5 font-inter bg-[#FFC862] rounded-full'>
						<span>Jelajahi Sekarang</span>
						<Image
							alt='icon arrow'
							src={'/icons/arrow-right-sharp.svg'}
							width={15}
							height={15}
						/>
					</button>
				</div>
			</div>
		</section>
	);
};

export default ProgramDimensionSectionView;
