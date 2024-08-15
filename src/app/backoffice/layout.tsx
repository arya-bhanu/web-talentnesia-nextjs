'use client';

import Navbar from '@/backoffice/components/navbar';
import Sidebar from '@/backoffice/components/sidebar';
import React, { ReactNode, useEffect, useState } from 'react';

const BackofficeLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return true;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Navbar />
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
    </>
  );
};

export default BackofficeLayout;
