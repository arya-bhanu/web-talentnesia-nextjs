import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import styles from './benefitCard.module.css';
import { IBenefitCard } from './benefitCard.type';

const BenefitCardView = ({
  className,
  props,
}: {
  className?: string;
  props: IBenefitCard;
}) => {
  return (
    <figure
      className={clsx(
        className,
        'px-2 md:px-5 lg:px-7 py-2 h-full md:py-6 lg:py-8 rounded-lg bg-white flex flex-col items-center sm:items-start',
        styles.card,
      )}
    >
      <Image
        alt="benefit image"
        src={props.imgUrl}
        width={64}
        height={64}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="lg:scale-100 scale-90"
      />
      <figcaption className="mt-2 lg:mt-4">
        <h2 className="text-[#344054] text-center sm:text-start font-semibold">
          {props.label}
        </h2>
      </figcaption>
    </figure>
  );
};

export default BenefitCardView;
