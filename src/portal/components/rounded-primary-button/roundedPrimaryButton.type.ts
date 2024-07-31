import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface RoundedPrimaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: string;
  textColor?: string;
  children: ReactNode;
  className?: string;
}
