'use client';

import Navbar from '@/backoffice/components/navbar';
import React, { ReactNode, useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { getSession } from '@/lib/action';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Loading from '@/components/loading';
import { accessRole } from 'data';
import AlertModal from '@/backoffice/components/alert-modal/AlertModal';
import { isTokenNull } from '@/lib/lib';

const Sidebar = dynamic(() => import('@/backoffice/components/sidebar'), {
  ssr: false,
});

const BackofficeLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isDashboard, setIsDashboard] = useState(false);
  const router = useRouter();
  const { user, setUser } = useAuth();

  const [showSessionEndedModal, setShowSessionEndedModal] = useState(isTokenNull());

  useEffect(() => {
    if (user) {
      const role = user.role;
      window.localStorage.removeItem('access');
      // admin role
      if (role === 1) {
        window.localStorage.setItem('access', JSON.stringify(accessRole.admin));
        return;
      }
      // mentor role
      if (role === 3) {
        window.localStorage.setItem(
          'access',
          JSON.stringify(accessRole.mentor),
        );
        return;
      }
    }
  }, [JSON.stringify(user)]);

  const checkAuth = useCallback(async () => {
    try {
      if (isTokenNull()) {
        setShowSessionEndedModal(true);
        return;
      }

      const session = await getSession();
      if (!session || !session.isLoggedIn || session.role !== 1) {
        setShowSessionEndedModal(true);
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
      setShowSessionEndedModal(true);
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

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
    const isDashboardPath = pathname.includes('dashboard');
    setIsDashboard(isDashboardPath);
  }, [pathname]);

  // New useEffect for continuous token checking
  useEffect(() => {
    const tokenCheckInterval = setInterval(() => {
      if (isTokenNull()) {
        setShowSessionEndedModal(true);
      }
    }, 5000); // Check every minute

    return () => clearInterval(tokenCheckInterval);
  }, []);

  if (isLoading) { 
    return <Loading isLoading={isLoading} />;
  }

  if (!user) {
    return null;
  }

  // Determine if background color should be hidden based on current route
  const customPageStyle = [
    '/backoffice/report/',
    '/backoffice/program/',
    '/backoffice/manage-program/',
    '/backoffice/manage-program/update-program/',
    '/backoffice/dashboard/',
    '/backoffice/manage-program/add-program/',
  ].includes(pathname);
  const containerStyle = {
    // maxWidth: '80%',
    // marginLeft: '9%',
  };

  const handleSessionEndedConfirm = () => {
    setShowSessionEndedModal(false);
    router.push('/auth/login');
  };

  return (
    <div className="bg-[#FAFAFA]">
      <AlertModal
        openModal={showSessionEndedModal}
        setOpenModal={setShowSessionEndedModal}
        setIsConfirmed={handleSessionEndedConfirm}
        messageText="Your Login Session Has Ended"
        showCancelButton={false}
        showCloseButton={false}
      />
      {user && (
        <Navbar
          moduleRoutePath='backoffice'
          user={user}
          style={isDashboard ? { ...containerStyle } : undefined}
        />
      )}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div
        className={`px-8 py-16 min-h-screen transition-all duration-300 ${
          isSidebarOpen ? 'md:ml-64' : 'md:ml-16'
        } bg-[#FAFAFA]`}
      >
        <div
          className={`mt-14 rounded-xl ${customPageStyle ? '' : 'p-4 shadow-sm bg-[#FFFFFF]'}`}
          style={
            isDashboard
              ? {
                marginTop: '3rem',
                }
              : { }
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BackofficeLayout;
