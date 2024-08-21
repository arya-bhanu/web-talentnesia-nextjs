'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import OperatorLayout from './OperatorLayout';

export default function OperatorRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <OperatorLayout>{children}</OperatorLayout>
    </AuthProvider>
  );
}