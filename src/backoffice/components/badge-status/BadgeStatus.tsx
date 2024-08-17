import React from 'react';
import clsx from 'clsx';
import { BadgeStatusProps } from './badgeStatus.type';

export const BadgeStatus: React.FC<BadgeStatusProps> = ({ status }) => {
  const isActive = status === 1;

  return (
    <span
      className={clsx(
        'px-3 py-2 rounded-lg text-xs font-medium',
        isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      )}
    >
      {isActive ? 'Active' : 'Non Active'}
    </span>
  );
};
