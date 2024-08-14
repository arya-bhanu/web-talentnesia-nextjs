import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { ListCardProps } from './listCard.type';

const ListCardView = ({
  cards,
  className,
}: {
  cards: ListCardProps[];
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        className,
        'bg-[#F9FAFB] rounded-lg shadow-sm max-w-md w-full',
      )}
    >
      <ul>
        {cards.map((card, index) => (
          <li key={index}>
            <Link
              href={card.url}
              className={clsx(
                'w-full text-left p-4 font-semibold text-[#344054] text-base xl:text-lg transition-colors flex justify-between items-center font-poppins',
                'hover:bg-[#00B3AD] hover:text-white',
              )}
            >
              <span>{card.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListCardView;
