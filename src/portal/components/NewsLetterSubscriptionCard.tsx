import clsx from 'clsx';
import React from 'react';
import Arrow from '../../../public/icons/arrow-right-sharp.svg';
import RoundedPrimaryButton from './RoundedPrimaryButton';
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
			<RoundedPrimaryButton className='px-6'>{actionButton.text}</RoundedPrimaryButton>
		</div>
	);
};

export default NewsLetterSubscriptionCard;
