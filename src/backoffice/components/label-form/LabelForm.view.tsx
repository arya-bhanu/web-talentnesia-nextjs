import clsx from 'clsx';
import React from 'react';
import { LabelViewProps } from './label.type';

const LabelFormView: React.FC<LabelViewProps> = ({
  children,
  className,
  isImportant = false,
  ...rest
}) => {
  return (
    <label {...rest} className={clsx('font-lato text-sm font-bold', className)}>
      {children}
      {isImportant && <span className="text-red-500">*</span>}
    </label>
  );
};

export default LabelFormView;
