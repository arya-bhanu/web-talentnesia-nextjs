'use client';

import Navbar from '@/backoffice/components/mentor/components/navbar';
import React, { ReactNode, useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { getSession } from '@/lib/action'; // Removed refreshToken
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const Sidebar = dynamic(
  () => import('@/backoffice/components/mentor/components/sidebar'),
  {
    ssr: false,
  },
);

const MentorLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user, setUser } = useAuth();

  const checkAuth = useCallback(async () => {
    try {
      const session = await getSession();
      if (!session || !session.isLoggedIn || session.role !== 3) {
        router.push('/auth/login');
      } else {
        setUser({
          userId: session.userId || '',
          name: session.name || '',
          email: session.email || '',
          profilePicture: session.profilePicture || '',
          role: session.role,
        });
        // Removed refreshToken call
      }
    } catch (error) {
      console.error('Authentication error:', error);
      router.push('/auth/login');
    } finally {
      setIsLoading(false);
    }
  }, [router, setUser]);

  useEffect(() => {
    checkAuth();
    // Removed interval for checkAuth
  }, [checkAuth]);

  useEffect(() => {
    checkAuth();
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Consider using a proper loading component
  }

  if (!user) {
    return null;
  }

  const customPageStyle = [
    '/mentor/dashboard/',
    '/mentor/manage-program/',
    '/mentor/manage-program/detail-program/',
  ].includes(pathname);

  return (
    <div className="bg-[#FAFAFA]">
      {user && <Navbar moduleRoutePath="mentor" user={user} />}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div
        className={`px-8 py-16 min-h-screen transition-all duration-300 md:ml-64 bg-[#FAFAFA]`}
      >
        <div
          className={`mt-14 rounded-xl ${customPageStyle ? '' : 'p-4 shadow-sm bg-[#FFFFFF]'}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MentorLayout;
