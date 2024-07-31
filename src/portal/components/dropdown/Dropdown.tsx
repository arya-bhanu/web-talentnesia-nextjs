import React from 'react';
import DropdownView from './Dropdown.view';
import { IDropdown } from './dropdown.type';

const Dropdown = (props: IDropdown) => {
  return <DropdownView {...props} />;
};

export default Dropdown;
