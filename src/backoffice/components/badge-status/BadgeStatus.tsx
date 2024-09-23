import React from 'react';
import clsx from 'clsx';
import { BadgeStatusProps } from './badgeStatus.type';
// 1 = Active / Non Active

export const BadgeStatus: React.FC<BadgeStatusProps> = ({ status, type }) => {

  const { textStatus, styling } = (() => {
    if (type === 1) {
      switch (status) {
        case 0:
          return { textStatus: 'Non Active', styling: 'bg-red-100 text-red-500/80' };
        case 1:
          return { textStatus: 'Active', styling: 'bg-green-100 text-green-500/80' };
        default:
          return { textStatus: 'Non Active', styling: 'bg-red-100 text-red-500/80' };
      }
    } else {
      switch (status) {
        case 0:
          return { textStatus: 'Not Started', styling: 'bg-red-100 text-red-500/80' };
        case 1:
          return { textStatus: 'On Going', styling: 'bg-yellow-100/50 text-yellow-500/80' };
        default:
          return { textStatus: 'Finished', styling: 'bg-green-100 text-green-500/80' };
      }
    }
  })();

    return (
      <span className={clsx('px-3 py-2 rounded-lg text-xs font-medium w-max block', styling)}>
        {textStatus}
      </span>
    );
  };
