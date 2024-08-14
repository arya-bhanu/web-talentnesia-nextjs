'use client';

import React from 'react';
import clsx from 'clsx';
import { TitleNavbarViewProps } from './titleNavbar.type';

export const TitleNavbarView: React.FC<TitleNavbarViewProps> = ({
  title,
  className,
}) => {
  return (
    <div
      className={clsx(
        className,
        'text-2xl font-bold text-[#323232] font-poppins mb-0.5',
      )}
    >
      {title}
    </div>
  );
};
