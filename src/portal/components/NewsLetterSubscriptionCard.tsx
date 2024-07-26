import clsx from 'clsx';
import React from 'react';
import Arrow from '../../../../public/icons/arrow-right-sharp.svg';
const NewsLetterSubscriptionCard = ({
	title,
	subTitle,
	actionButton,
	color,
}: {
	title: string;
	subTitle: string;
	actionButton: {
		text: string;
		bgColor: string;
		textColor: string;
	};
	color: {
		bg: string;
		text: string;
		input: string;
	};
}) => {
	const placeholderColor = `placeholder-[${color.input}]`;
	const borderColor = `border-b border-b-[${color.input}]`;
	return (
		<div
			className={clsx(
				color.bg,
				'rounded-3xl pl-16 py-16 pr-8 flex items-end gap-12'
			)}
		>
			<div className={clsx(color.text, 'flex-[2]')}>
				<h3 className='text-xl font-semibold font-poppins'>{title}</h3>
				<p className='text-sm font-[400] mt-9'>{subTitle}</p>
			</div>
			<input
				type='email'
				placeholder='Tulis email anda'
				className={clsx(
					color.text,
					'bg-transparent outline-none flex-[2] py-2 text-sm',
					placeholderColor,
					borderColor
				)}
			/>
			<button
				className={clsx(
					actionButton.bgColor,
					'px-3 py-2.5 rounded-full flex items-center justify-around gap-3 flex-[1]'
				)}
			>
				<span className={clsx(actionButton.textColor, 'font-medium')}>
					{actionButton.text}
				</span>
				<Arrow />
			</button>
		</div>
	);
};

export default NewsLetterSubscriptionCard;
