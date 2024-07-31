'use client';
import Header from '@/portal/components/Header';
import Footer from '@/portal/components/Footer';
import React, { ReactNode } from 'react';
import ObserverProvider from '@/utils/portal/ObserverProvider';

const PortalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ObserverProvider>
      <section className="pt-12">
        <Header />
        <main>{children}</main>
        <Footer className="mt-24" />
      </section>
    </ObserverProvider>
  );
};

export default PortalLayout;
