import React from 'react';

export interface User {
  id: string;
  photoProfile: string;
  name: string;
  email: string;
  phone: string;

  
  role: number;
  active: number;
  profilePicture: string;
  profilePictureOrigin: string | null;
  
  nik: string;
  photoKtp: string;
  photoKtpOrigin?: string | null;
  placeOfBirth: string;
  dateOfBirth: string;
  religionId: string | null;
  gender: number;


  provinceId: string | null;
  districtId: string | null;
  subDistrictId: string | null;
  zipCode: string;
  addressKtp: string;
  addressDomicile: string;

  educationName: string;
  educationLevelId: string | null;
  educationStart: string | null;
  educationEnd: string | null;

  
}


export interface IUserView {
  Filter: string;
  setFilter: (value: string) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: (isOpen: boolean) => void;
  handleActionButtonRow: (id: string, action: 'delete' | 'edit', rowData?: User) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TabFlexProps {
  tabs: {
    title: string;
    content: React.ReactNode;
    active: boolean;
    disabled?: boolean;
  }[];
  onTabChange: (tabTitle: string) => void;
}

