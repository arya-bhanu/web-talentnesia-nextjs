import Navbar from '@/backoffice/components/navbar';
import Sidebar from '@/backoffice/components/sidebar';
import React, { ReactNode } from 'react';

const BackofficeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section>
      <Navbar />
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          {children}
        </div>
      </div>
    </section>
  );
};

export default BackofficeLayout;
