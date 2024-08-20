'use client';

import Navbar from '@/backoffice/components/navbar';
import React, { ReactNode, useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { getSession, logout } from '@/lib/action';
import { useRouter } from 'next/navigation';
import { User } from '@/backoffice/components/navbar/navbar.type';

const Sidebar = dynamic(() => import('@/backoffice/components/sidebar'), {
  ssr: false,
});

const BackofficeLayout = ({ children }: { children: ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const session = await getSession();
      if (!session.isLoggedIn || session.role !== 1) {
        router.push('/auth/login');
      } else {
        setUser({
          userId: session.userId ?? '',
          name: session.name ?? '',
          email: session.email ?? '',
          role: session.role
        });
      }
    } catch (error) {
      console.error('Authentication error:', error);
      router.push('/auth/login');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
    const intervalId = setInterval(checkAuth, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [checkAuth]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      logout();
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const checkAuthorization = async () => {
      const session = await getSession();
      if (session.isLoggedIn && session.role === 1) {
        setIsAuthorized(true);
      } else {
        router.push('/unauthorized');
      }
    };

    checkAuthorization();
  }, [router]);

  if (!isAuthorized) {
    return null; // or a loading spinner
  }

  if (isLoading) {
    return; 
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="bg-[#FAFAFA]">
        <Navbar user={user} />
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div
          className={`px-8 py-16 bg-[#FAFAFA] min-h-screen transition-all duration-300 md:ml-64`}
        >
          <div className="p-4 bg-[#FFFFFF] mt-14 rounded-xl shadow-sm">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default BackofficeLayout;
