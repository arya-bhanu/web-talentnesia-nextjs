'use client';
import FormManageModul from '@/backoffice/modules/manage-modul/components/form/FormManageModul';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const ManageModulUpdateIndex = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  return <FormManageModul slug={Number(slug)} />;
};

export default ManageModulUpdateIndex;
