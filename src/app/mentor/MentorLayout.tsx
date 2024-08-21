'use client';

import Navbar from '@/mentor/components/navbar';
import React, {
  ReactNode,
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';
import dynamic from 'next/dynamic';
import { getSession, refreshToken } from '@/lib/action';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const Sidebar = dynamic(() => import('@/mentor/components/sidebar'), {
  ssr: false,
});

const MentorLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user, setUser } = useAuth();
  const auth = useAuth();

  const checkAuth = useCallback(async () => {
    try {
      const session = await getSession();
      if (!session.isLoggedIn || session.role !== 3) {
        router.push('/auth/login');
      } else if (auth) {
        auth.setUser({
          userId: session.userId || '',
          name: session.name || '',
          email: session.email || '',
          role: session.role,
        });
        await refreshToken();
      }
    } catch (error) {
      console.error('Authentication error:', error);
      router.push('/auth/login');
    } finally {
      setIsLoading(false);
    }
  }, [router, auth]);

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

  if (isLoading) {
    return <div>Loading...</div>; // Consider using a proper loading component
  }

  if (!auth.user) {
    return null;
  }

  return (
    <AuthProvider>
      <div className="bg-[#FAFAFA]">
        {user && <Navbar user={user} />}
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
    </AuthProvider>
  );
};

export default MentorLayout;
