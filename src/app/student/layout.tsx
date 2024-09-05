'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import StudentLayout from './StudentLayout';

export default function StudentRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <StudentLayout>{children}</StudentLayout>
    </AuthProvider>
  );
}