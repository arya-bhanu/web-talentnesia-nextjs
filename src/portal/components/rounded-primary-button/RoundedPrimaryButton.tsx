import React from 'react';
import RoundedPrimaryButtonView from './RoundedPrimaryButton.view';
import { RoundedPrimaryButtonProps } from './roundedPrimaryButton.type';

const RoundedPrimaryButton: React.FC<RoundedPrimaryButtonProps> = ({
  bgColor = 'bg-[#FFC862]',
  textColor = 'text-[#241C4D]',
  children,
  className,
  ...rest
}) => {
  return (
    <RoundedPrimaryButtonView
      bgColor={bgColor}
      textColor={textColor}
      className={className}
      {...rest}
    >
      {children}
    </RoundedPrimaryButtonView>
  );
};

export default RoundedPrimaryButton;
