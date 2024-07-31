import React from 'react';
import Image from 'next/image';
const Dropdown = ({
	children,
	links,
}: {
	children: React.ReactNode;
	links?: string[];
}) => {
	return (
		<button className='flex items-center lg:gap-1 xl:gap-2 group'>
			<span className='font-inter font-medium lg:text-base text-sm'>{children}</span>
			<Image
				alt='arrow icon'
				src={'/icons/arrow-right.svg'}
                width={18}
                height={18}
                className='group-hover:rotate-180 transition'
			/>
		</button>
	);
};

export default Dropdown;
