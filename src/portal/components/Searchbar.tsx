import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
const SearchBar = ({
	placeHolder,
	className,
}: {
	placeHolder: string;
	className?: string;
}) => {
	return (
		<div
			className={clsx(
				'border-[#D0D5DD] border rounded-full gap-x-1.5 px-4 py-2.5 h-fit flex items-center',
				className
			)}
		>
			<input
				type='text'
				placeholder={placeHolder}
				className='font-poppins text-[#667085] text-sm w-full px-5 border-none outline-none'
			/>
			<button>
				<Image
					alt='icon search'
					src={'/icons/search-normal.svg'}
					width={15}
					height={15}
					className='mr-3'
				/>
			</button>
		</div>
	);
};

export default SearchBar;
