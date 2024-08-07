'use client';
import FormManageModul from '@/backoffice/modules/manage-modul/components/form-modul/FormManageModul';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

const ManageModulUpdateIndex = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  return <FormManageModul slug={Number(slug)} />;
};

const WrappedSuspenseComponent = () => {
  return (
    <Suspense>
      <ManageModulUpdateIndex />
    </Suspense>
  );
};

export default WrappedSuspenseComponent;
