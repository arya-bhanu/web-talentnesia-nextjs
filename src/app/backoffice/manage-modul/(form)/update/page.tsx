'use client';
import FormManageModul from '@/backoffice/modules/manage-modul/components/form-modul/FormManageModul';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

const ManageModulUpdateIndex = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SuspenseManageModulUpdate />
    </Suspense>
  );
};

function SuspenseManageModulUpdate() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  return <FormManageModul slug={Number(slug)} />;
}

export default ManageModulUpdateIndex;
