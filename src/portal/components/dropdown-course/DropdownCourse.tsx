'use client';

import React, { useState } from 'react';
import { dropdownItems, } from './dropdownCourse.data';
import DropdownCourseView from './DropdownCourse.view';

const DropdownCourse: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(dropdownItems[0]);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleItemSelect = (item: typeof selectedItem) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <DropdownCourseView
      isOpen={isOpen}
      toggleDropdown={toggleDropdown}
      popularItems={dropdownItems}
      otherItems={dropdownItems}
      selectedItem={selectedItem}
      onItemSelect={handleItemSelect}
    />
  );
};

export default DropdownCourse;
