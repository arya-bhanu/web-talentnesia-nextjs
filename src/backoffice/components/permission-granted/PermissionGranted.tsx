'use client';
import { IAccessRight } from '@/types/global.type';
import clsx from 'clsx';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';

const PermissionGranted = ({
  children,
  role,
  roleable = false,
}: {
  children: ReactNode;
  role: string;
  roleable?: boolean;
}) => {
  const [accessRights, setAccessRights] = useState<IAccessRight[] | null>(null);
  useEffect(() => {
    const accessString = window.localStorage.getItem('access');
    if (accessString) {
      const access = JSON.parse(accessString) as IAccessRight[];
      setAccessRights(access);
    }
  }, []);
  const isGranted = useMemo(() => {
    if (accessRights) {
      return roleable || accessRights.map((el) => el.code).includes(role);
    }
    return roleable;
  }, [JSON.stringify(accessRights), role, roleable]);
  return <div className={clsx(!isGranted && 'hidden')}>{children}</div>;
};

export default PermissionGranted;
