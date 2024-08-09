import Navbar from '@/backoffice/components/navbar';
import Sidebar from '@/backoffice/components/sidebar';
import React, { ReactNode } from 'react';

const BackofficeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="px-8 py-16 sm:ml-64 bg-[#FAFAFA] min-h-screen">
        <div className="p-4 bg-[#FFFFFF] mt-14 rounded-xl shadow-sm">
          {children}
        </div>
      </div>
    </>
  );
};

export default BackofficeLayout;
