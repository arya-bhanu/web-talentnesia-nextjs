'use client';
import Sidebar from '@/skripsi/backoffice/components/sidebar';
import React, { ReactNode, useState } from 'react';

const BackofficeLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="bg-[#FAFAFA]">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div
        className={`px-8 py-16 min-h-screen transition-all duration-300 md:ml-64 bg-[#FAFAFA]`}
      >
        <div
          className={'mt-14 rounded-xl p-4 shadow-sm bg-[#FFFFFF]'}
          style={{
            padding: '0',
            backgroundColor: 'transparent',
            marginTop: '-1px',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BackofficeLayout;
