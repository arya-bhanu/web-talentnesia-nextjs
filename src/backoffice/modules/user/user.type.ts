import React from 'react';

export interface User {
  id: string;
  photoProfile: string;
  name: string;
  email: string;
  phone: string;
}


export interface IUserView {
  Filter: string;
  setFilter: (value: string) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: (isOpen: boolean) => void;
  handleActionButtonRow: (id: string, action: 'delete' | 'edit', rowData?: User) => void;
}

export interface TabFlexProps {
  tabs: {
    title: string;
    content: React.ReactNode;
    active: boolean;
  }[];
  onTabChange: (tabTitle: string) => void;
}
