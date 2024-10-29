'use client';
import React, { ReactNode } from 'react';
import ObserverProvider from './ObserverProvider';
import Header from '../components/header';
import { useInView } from 'react-intersection-observer';

const HomeProvider = ({ children }: { children: ReactNode }) => {
  const { ref, inView } = useInView({ threshold: 1 });
  return (
    <ObserverProvider>
      <div ref={ref} className="w-full absolute top-0 h-2 bg-white opacity-0" />
      <Header isTopView={inView} />
      <main>{children}</main>
    </ObserverProvider>
  );
};

export default HomeProvider;
