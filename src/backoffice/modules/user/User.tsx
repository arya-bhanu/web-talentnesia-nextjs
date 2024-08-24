'use client';

import React, { useState, useEffect } from 'react';
import UserView from './User.view';
import { userAPI } from './api/userApi';
import { User } from './user.type';

const UserComponent: React.FC = () => {
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleActionButtonRow = async (id: string, action: 'delete' | 'edit', rowData?: User) => {
    if (action === 'delete') {
      await userAPI.delete(id);
    } else if (action === 'edit' && rowData) {
      await userAPI.update(id, rowData);
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

export default UserComponent;