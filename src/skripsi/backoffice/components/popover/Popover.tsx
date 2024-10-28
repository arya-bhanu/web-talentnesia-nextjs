import React from 'react';
import { IPopover } from './popover.type';
import PopoverView from './Popover.view';

const Popover: React.FC<IPopover> = (props) => {
  return <PopoverView {...props} />;
};

export default Popover;
