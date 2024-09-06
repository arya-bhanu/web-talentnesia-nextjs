'use client';
import { IAccessRight } from '@/types/global.type';
import clsx from 'clsx';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';

const PermissionGranted = ({
  children,
  rule,
}: {
  children: ReactNode;
  rule: string;
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
      return accessRights.map((el) => el.code).includes(rule);
    }
    return false;
  }, [JSON.stringify(accessRights), rule]);
  return <div className={clsx(!isGranted && 'hidden')}>{children}</div>;
};

export default PermissionGranted;
