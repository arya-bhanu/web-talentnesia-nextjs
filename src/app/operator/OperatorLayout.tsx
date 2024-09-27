'use client';

import Navbar from '@/backoffice/components/operator/components/navbar';
import React, { ReactNode, useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { getSession } from '@/lib/action';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Loading from '@/components/loading';

const Sidebar = dynamic(
  () => import('@/backoffice/components/operator/components/sidebar'),
  {
    ssr: false,
  },
);

const OperatorLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isDashboard, setIsDashboard] = useState(false);
  const router = useRouter();
  const { user, setUser } = useAuth();

  const checkAuth = useCallback(async () => {
    try {
      const session = await getSession();
      if (!session || !session.isLoggedIn || session.role !== 2) {
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
    return <Loading isLoading={isLoading} />;
  }

  if (!user) {
    return null;
  }

  const containerStyle = {
    // maxWidth: '80%',
    // marginLeft: '9%',
  };

  const customPageStyle = [
    '/operator/dashboard/',
    '/operator/manage-program/',
    '/operator/manage-program/detail-program/',
  ].includes(pathname);

  return (
    <div className="bg-[#FAFAFA]">
      {user && (
        <Navbar
          moduleRoutePath="mentor"
          user={user}
          style={isDashboard ? { ...containerStyle } : undefined}
          isSidebarOpen={isSidebarOpen}
        />
      )}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div
        className={`px-8 py-16 min-h-screen transition-all duration-300 ${
          isSidebarOpen ? 'md:ml-64' : 'ml-12 md:ml-16'
        } bg-[#FAFAFA]`}
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

export default OperatorLayout;
