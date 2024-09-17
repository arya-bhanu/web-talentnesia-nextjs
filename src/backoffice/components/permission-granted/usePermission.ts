import { useState, useEffect } from 'react';

interface IAccessRight {
  code: string;
}

const usePermission = (role: string, roleable?: boolean) => {
  const [accessRights, setAccessRights] = useState<IAccessRight[] | null>(null);
  const [isGranted, setIsGranted] = useState(false);

  useEffect(() => {
    const accessString = window.localStorage.getItem('access');
    if (accessString) {
      const access = JSON.parse(accessString) as IAccessRight[];
      setAccessRights(access);
    }
  }, []);

  useEffect(() => {
    if (accessRights) {
      const hasAccess = accessRights.map((el) => el.code).includes(role);
      setIsGranted(roleable || hasAccess);
    }
  }, [accessRights, role, roleable]);

  return isGranted;
};

export default usePermission;
