import React, { SetStateAction } from 'react';

export interface IButtonCarousel {
  nButton: number;
  activeNumber: number;
  setActiveNumber: React.Dispatch<SetStateAction<number>>;
  className?: string;
}
