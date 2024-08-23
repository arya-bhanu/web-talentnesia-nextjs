import React from 'react';
import { IBadgeType } from './badge.type';
// @ts-ignore
import { hexToRgba } from 'hex-and-rgba/esm';

const BadgeView: React.FC<IBadgeType> = ({ children, color }) => {
  const [red, green, blue, alpha] = hexToRgba(color);
  return (
    <div
      style={{ color, backgroundColor: `rgba(${red},${green},${blue},0.12)` }}
      className='w-fit py-2 px-4 rounded-lg'
    >
      {children}
    </div>
  );
};

export default BadgeView;
