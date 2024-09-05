'use client';
import ManageModul from '@/backoffice/modules/manage-modul';
import { useAuth } from '@/contexts/AuthContext';
import { accessRole } from 'data';
import { useEffect } from 'react';
const ManageModulIndex = () => {
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      const role = user.role;
      window.localStorage.removeItem('access');
      if (role === 1) {
        window.localStorage.setItem('access', JSON.stringify(accessRole.admin));
        return;
      }
      if (role === 3) {
        window.localStorage.setItem(
          'access',
          JSON.stringify(accessRole.mentor),
        );
        return;
      }
    }
  }, [JSON.stringify(user)]);
  return <ManageModul />;
};

export default ManageModulIndex;
