'use client';
import Header from '@/skripsi/components/header';
import Footer from '@/skripsi/components/footer';
import React, { ReactNode } from 'react';
import ObserverProvider from '@/skripsi/provider/ObserverProvider';
import { useInView } from 'react-intersection-observer';

const PortalLayout = ({ children }: { children: ReactNode }) => {
  const { ref, inView } = useInView({ threshold: 1 });
  return (
    <ObserverProvider>
      <section>
        <div
          ref={ref}
          className="w-full absolute top-0 h-2 bg-white opacity-0"
        />
        <Header isTopView={inView} />
        <main>{children}</main>
        <Footer className="mt-24" />
      </section>
    </ObserverProvider>
  );
};

export default PortalLayout;
