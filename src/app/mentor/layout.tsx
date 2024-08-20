'use client';

import Navbar from '@/backoffice/components/navbar';
import React, { ReactNode, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getSession } from '@/lib/action';
import { useRouter } from 'next/navigation';
import { User } from '@/backoffice/components/navbar/navbar.type';

const Sidebar = dynamic(() => import('@/backoffice/components/sidebar'), {
  ssr: false,
});

const BackofficeLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
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
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!user) {
    return null; // or a loading spinner
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
