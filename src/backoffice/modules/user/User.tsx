'use client';

import React, { useState, useEffect } from 'react';
import type { User } from './user.type';
import { userAPI } from './api/userApi';
import UserView from './User.view';
import { MentorFormData } from './mentor/MentorForm.type';

const convertUserToMentorFormData = (user: User): MentorFormData => {
  return {
    id: user.id,
    role: 3,
    active: 1,
    profilePicture:'',
    profilePictureOrigin: '',
    name: user.name,
    nik: '',
    npwp: '',
    photoKtp: '',
    photoKtpOrigin: '',
    photoNpwp: '',
    photoNpwpOrigin: '',
    placeOfBirth: '',
    dateOfBirth: '',
    religionId: null,
    gender: 0,
    mariageStatus: '',
    numberOfChildren: '',
    contract: '',
    contractOrigin: '',
    phone: user.phone,
    email: user.email,
    linkedin: '',
    emergencyContact: '',
    provinceId: null,
    districtId: null,
    subDistrictId: null,
    zipCode: '',
    addressKtp: '',
    addressDomicile: '',
    educations: [],
  };
};

const User: React.FC = () => {
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleActionButtonRow = async (id: string, action: "edit" | "delete", rowData?: User) => {
    if (action === 'edit' && rowData) {
      try {
        await userAPI.update(id, convertUserToMentorFormData(rowData));
        // Handle successful update
      } catch (error) {
        console.error('Error updating user:', error);
        // Handle error
      }
    } else if (action === 'delete') {
      try {
        await userAPI.delete(id);
        // Handle successful deletion
      } catch (error) {
        console.error('Error deleting user:', error);
        // Handle error
      }
    }
  };
  return (
    <UserView
      Filter={Filter}
      setFilter={setFilter}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      handleActionButtonRow={handleActionButtonRow}
    />
  );
};

export default User;
