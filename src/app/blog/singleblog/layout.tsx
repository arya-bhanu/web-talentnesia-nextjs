'use client';
import Header from '@/portal/components/header/Header';
import Footer from '@/portal/components/footer';
import React, { ReactNode } from 'react';
import ObserverProvider from '@/utils/portal/ObserverProvider';
import { useInView } from 'react-intersection-observer';
import SingleBlog from '@/portal/components/Blog/SingleBlog';


const SingleBlogLayout = ({ children }: { children: ReactNode }) => {
  const { ref, inView } = useInView({ threshold: 1 });
  return (
    <ObserverProvider>
      <section>
        <div ref={ref} className="w-full absolute top-0 h-2 bg-white opacity-0" />
        <Header isTopView={inView} />
        <main>{children}</main>
        <Footer className="mt-24" />
      </section>
    </ObserverProvider>
  );
};

export default SingleBlogLayout;
