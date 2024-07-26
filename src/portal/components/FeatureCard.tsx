import Image from 'next/image';
import React from 'react';

export interface IFeatureCard {
	imgUrl: string;
	title: string;
	category: string;
	ratingNumber: number;
	price: number;
	prevPrice: number;
}
const FeatureCard = (props: IFeatureCard) => {
	const formatRupiah = (angka: number) => {
		var reverse = angka.toString().split('').reverse().join('');
		var ribuan = reverse.match(/\d{1,3}/g);
		var formatted = ribuan?.join('.').split('').reverse().join('');
		return 'Rp ' + formatted;
	};
	const renderStar = (n: number) => {
		const stars = [];

		for (let i = 0; i < n; i++) {
			stars.push(
				<Image
					key={i} // Add a unique key for each star
					alt={`star-${i}`} // Unique alt text for accessibility
					src='/icons/star.svg' // Adjust the path to your star icon
					width={14} // Adjust width as needed
					height={14} // Adjust height as needed
				/>
			);
		}
		return stars;
	};
	return (
		<figure className='border border-[#EAECF0] rounded-md overflow-clip'>
			<div className='h-[180px]  overflow-clip  w-full'>
				<Image
					alt='card image'
					src={props.imgUrl}
					width={400}
					height={180}
				/>
			</div>
			<div className='py-6 px-5'>
				<figcaption className='text-xl font-poppins font-semibold line-clamp-2'>
					{props.title}
				</figcaption>
				<p className='text-xs text-[#667085] mt-3'>{props.category}</p>
				<div className='flex items-center gap-2 mt-3'>
					<p className='text-xs text-[#344054] '>{props.ratingNumber}</p>
					<div className='flex items-center gap-1 '>{renderStar(5)}</div>
				</div>
				<div className='flex items-center gap-2 mt-5'>
					<p className='text-xl font-semibold'>{formatRupiah(props.price)}</p>
					<p className='font-poppins text-[#98A2B3] text-sm line-through'>
						{formatRupiah(props.prevPrice)}
					</p>
				</div>
			</div>
		</figure>
	);
};

export default FeatureCard;
