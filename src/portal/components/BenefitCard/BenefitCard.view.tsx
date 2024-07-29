import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import styles from './benefit_card.module.css';
export interface IBenefitCard {
	imgUrl: string;
	label: string;
}
const BenefitCard = ({
	className,
	props,
}: {
	className?: string;
	props: IBenefitCard;
}) => {
	return (
		<figure className={clsx(className, 'px-7 py-8 rounded-lg bg-white', styles.card)}>
			<Image
				alt='benefit image'
				src={props.imgUrl}
				width={64}
				height={64}
			/>
			<figcaption>
				<h2>{props.label}</h2>
			</figcaption>
		</figure>
	);
};

export default BenefitCard;
