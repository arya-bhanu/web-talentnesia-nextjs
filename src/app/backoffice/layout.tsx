'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import BackofficeLayout from './BackofficeLayout';

export default function BackofficeRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <BackofficeLayout>{children}</BackofficeLayout>
    </AuthProvider>
  );
}