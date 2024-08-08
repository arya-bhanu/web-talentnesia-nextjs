import React from 'react';
import PopoverActionView from './PopoverAction.view';
import { IPopOverAction } from './popOverAction.type';

const PopoverAction: React.FC<IPopOverAction> = (props) => {
  return <PopoverActionView {...props} />;
};

export default PopoverAction;
