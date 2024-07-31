'use client';
import Header from '@/portal/components/header/Header';
import Footer from '@/portal/components/footer';
import React, { ReactNode, useContext } from 'react';
import ObserverProvider, {
  ObserverContext,
} from '@/utils/portal/ObserverProvider';

const PortalLayout = ({ children }: { children: ReactNode }) => {
  const { topViewObserver } = useContext(ObserverContext);
  return (
    <ObserverProvider>
      <section className="pt-12">
        <div
          id="top-element"
          ref={topViewObserver.observerRef}
          className="w-full h-2 absolute top-0"
        />
        <Header />
        <main>{children}</main>
        <Footer className="mt-24" />
      </section>
    </ObserverProvider>
  );
};

export default PortalLayout;
