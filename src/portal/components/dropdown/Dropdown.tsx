import React, { useState } from 'react';
import { DropdownView } from './Dropdown.view';
import { IDropdown } from './dropdown.type';

const Dropdown = (props: IDropdown) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownView {...props} isOpen={isOpen} toggleDropdown={toggleDropdown} />
  );
};

export default Dropdown;
