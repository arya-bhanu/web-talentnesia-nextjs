// file: RoundedPrimaryButton.view.tsx

import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import Arrow from '../../../../public/icons/arrow-right-sharp.svg';

interface RoundedPrimaryButtonViewProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: string;
  textColor?: string;
  children: ReactNode;
  className?: string;
}

const RoundedPrimaryButtonView: React.FC<RoundedPrimaryButtonViewProps> = ({
  bgColor = 'bg-[#FFC862]',
  textColor = 'text-[#241C4D]',
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        bgColor,
        'px-3 py-2.5',
        'gap-3',
        'justify-around',
        'rounded-full flex items-center',
        className,
      )}
      {...rest}
    >
      <span className={clsx(textColor, 'font-medium text-sm')}>{children}</span>
      <Arrow />
    </button>
  );
};

export default RoundedPrimaryButtonView;
