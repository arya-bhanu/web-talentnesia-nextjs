import clsx from 'clsx';
import React from 'react';
import { IButtonCarousel } from './buttonCarousel.type';

const ButtonView = ({
  nButton,
  activeNumber,
  setActiveNumber,
  className,
}: IButtonCarousel) => {
  const buttons = [];
  for (let x = 0; x < nButton; x++) {
    buttons.push(
      <button
        onClick={() => setActiveNumber(x)}
        key={x}
        className={clsx(
          'h-[2px] transition',
          activeNumber === x ? 'bg-[#98A2B3] w-10' : 'bg-[#D0D5DD] w-6',
        )}
      ></button>,
    );
  }
  return (
    <div className={clsx('flex items-center gap-3', className)}>{buttons}</div>
  );
};

export default ButtonView;
