'use client';

import Navbar from '@/backoffice/components/student/components/navbar';
import React, { ReactNode, useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { getSession } from '@/lib/action'; // Removed refreshToken
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const Sidebar = dynamic(
  () => import('@/backoffice/components/student/components/sidebar'),
  {
    ssr: false,
  },
);

const StudentLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isDashboard, setIsDashboard] = useState(false);
  const router = useRouter();
  const { user, setUser } = useAuth();

  const checkAuth = useCallback(async () => {
    try {
      const session = await getSession();
      if (!session || !session.isLoggedIn || session.role !== 4) {
        router.push('/auth/login');
      } else {
        setUser({
          userId: session.userId || '',
          name: session.name || '',
          email: session.email || '',
          profilePicture: session.profilePicture || '',
          role: session.role,
        });
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
  }, [checkAuth]);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const { pathname } = window.location;
    const isDashboardPath = pathname.includes('dashboard');
    setIsDashboard(isDashboardPath);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  // Determine if background color should be hidden based on current route
  const customPageStyle = pathname.startsWith('/student/student/');

  return (
    <div className="bg-[#FAFAFA]">
      {user && <Navbar moduleRoutePath="student" user={user} />}
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

export default StudentLayout;
