'use client';

import Navbar from '@/mentor/components/navbar';
import React, { ReactNode, useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { getSession, logout } from '@/lib/action';
import { useRouter } from 'next/navigation';
import { User } from '@/mentor/components/navbar/navbar.type';

const Sidebar = dynamic(() => import('@/mentor/components/sidebar'), {
  ssr: false,
});

const MentorLayout = ({ children }: { children: ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const session = await getSession();
      if (!session.isLoggedIn || session.role !== 3) {
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
      if (session.isLoggedIn && session.role === 3) {
        setIsAuthorized(true);
      } else {
        return ('unauthorized');
      }
    };

    checkAuthorization();
  });

  if (!isAuthorized) {
    return null;
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

export default MentorLayout;
