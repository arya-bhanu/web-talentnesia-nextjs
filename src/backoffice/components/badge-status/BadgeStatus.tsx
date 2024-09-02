import React, { useMemo } from 'react';
import clsx from 'clsx';
import { BadgeStatusProps } from './badgeStatus.type';
// 1 = active / inactive


export const BadgeStatus: React.FC<BadgeStatusProps> = ({ status, type }) => {
  let textStatus:string = '';
  let styling:string = '';

  if (type == 1) {
     textStatus = useMemo(() => {
      switch (status) {
        case 0:
          return 'Inactive';
        case 1:
          return 'Active';
        default:
          return 'Inactive';
      }
    }, [status]);
  } else {
     textStatus = useMemo(() => {
      switch (status) {
        case 0:
          return 'Not Started';
        case 1:
          return 'On Going';
        default:
          return 'Finished';
      }
    }, [status]);
  }

  
  if (type == 1) {
     styling = useMemo(() => {
      switch (status) {
        case 0:
          return 'bg-red-100 text-red-500/80';
        case 1:
          return 'bg-green-100/50 text-green-500/80';
        default:
          return 'bg-green-100 text-green-500/80';
      }
    }, [status]);
  } else {
    styling = useMemo(() => {
      switch (status) {
        case 0:
          return 'bg-red-100 text-red-500/80';
        case 1:
          return 'bg-yellow-100/50 text-yellow-500/80';
        default:
          return 'bg-green-100 text-green-500/80';
      }
    }, [status]);
  }
  
  return (
    <span className={clsx('px-3 py-2 rounded-lg text-xs font-medium', styling)}>
      {textStatus}
    </span>
  );
};
