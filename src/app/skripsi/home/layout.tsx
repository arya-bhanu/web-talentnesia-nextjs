import Footer from '@/skripsi/components/footer';
import React, { ReactNode } from 'react';
import HomeProvider from '@/skripsi/provider/HomeProvider';

const PortalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section>
      <HomeProvider>{children}</HomeProvider>
      <Footer className="mt-24" />
    </section>
  );
};

export default PortalLayout;
