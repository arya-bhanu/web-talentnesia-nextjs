'use client';
import Footer from '@/portal/components/footer';
import Header from '@/portal/components/header/Header';
import ObserverProvider from '@/utils/portal/ObserverProvider';
import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

const SingleBlogLayout = ({ children }: { children: ReactNode }) => {
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

export default SingleBlogLayout;
