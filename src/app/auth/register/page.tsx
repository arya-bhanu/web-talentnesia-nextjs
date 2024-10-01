import React from 'react';
import dynamic from 'next/dynamic';

const RegisterComponent = dynamic(() => import('@/backoffice/modules/auth/register/Register').then(mod => mod.Register), {  ssr: false
});

export default function RegisterPage() {
  return <RegisterComponent />;
}
