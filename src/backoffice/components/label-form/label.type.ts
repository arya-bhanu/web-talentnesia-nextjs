import { LabelHTMLAttributes, ReactNode } from 'react';

export interface LabelViewProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  className?: string;
  isImportant?: boolean;
}
