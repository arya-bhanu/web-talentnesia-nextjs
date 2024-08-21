'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import MentorLayout from './MentorLayout';

export default function MentorRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <MentorLayout>{children}</MentorLayout>
    </AuthProvider>
  );
}