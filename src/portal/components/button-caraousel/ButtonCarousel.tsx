import clsx from 'clsx';
import React, { SetStateAction } from 'react';

interface IButtonCarousel {
	nButton: number;
	activeNumber: number;
	setActiveNumber: React.Dispatch<SetStateAction<number>>;
	className?: string;
}
const ButtonCarousel = (props: IButtonCarousel) => {
	let buttons = [];
	for (let x = 0; x < props.nButton; x++) {
		buttons.push(
			<button
				onClick={() => props.setActiveNumber(x)}
				key={x}
				className={clsx(
					'h-[2px] transition',
					props.activeNumber === x ? 'bg-[#98A2B3] w-10' : 'bg-[#D0D5DD] w-6'
				)}
			></button>
		);
	}
	return (
		<div className={clsx('flex items-center gap-3', props.className)}>
			{buttons}
		</div>
	);
};

export default ButtonCarousel;
