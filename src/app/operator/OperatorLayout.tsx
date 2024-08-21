'use client';

import Navbar from '@/backoffice/components/navbar';
import React, { ReactNode, useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { getSession } from '@/lib/action'; // Removed refreshToken
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const Sidebar = dynamic(() => import('@/backoffice/components/sidebar'), {
  ssr: false,
});

const BackofficeLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
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
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="bg-[#FAFAFA]">
      {user && <Navbar user={user} />}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div
        className={`px-8 py-16 bg-[#FAFAFA] min-h-screen transition-all duration-300 md:ml-64`}
      >
        <div className="mt-14 rounded-xl shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BackofficeLayout;
