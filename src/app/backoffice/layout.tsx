import Navbar from '@/backoffice/components/navbar';
import Sidebar from '@/backoffice/components/sidebar';
import React, { ReactNode } from 'react';

const BackofficeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="px-8 py-16 sm:ml-64">
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 mt-14">
          {children}
        </div>
      </div>
    </>
  );
};

export default BackofficeLayout;
