import Image from 'next/image';
import React from 'react';

export interface IProgramDimension {
	title: string;
	imgUrl: string;
}
const ProgramDimensionCard = (props: IProgramDimension) => {
	return (
		<div className='p-5 hover:bg-[#EFF8FF] transition'>
			<Image
				alt='image card'
				src={props.imgUrl}
				width={50}
				height={50}
				className='object-cover rounded-full'
			/>
			<h4 className='font-inter mt-12'>{props.title}</h4>
		</div>
	);
};

export default ProgramDimensionCard;
