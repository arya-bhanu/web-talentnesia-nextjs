import React from 'react';
import InputDropdownView from './InputDropdown.view';
import { CustomDropdownProps } from './inputDropdown.type';

export const InputDropdown: React.FC<CustomDropdownProps> = (props) => {
  return <InputDropdownView {...props} />;
};
