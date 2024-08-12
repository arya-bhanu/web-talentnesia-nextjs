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
  const moduleId = searchParams.get('modulId');

  return <FormManageModul moduleId={moduleId || undefined} />;
}

const WrappedSuspenseComponent = () => {
  return (
    <Suspense>
      <ManageModulUpdateIndex />
    </Suspense>
  );
};

export default WrappedSuspenseComponent;
