'use client';

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
        <main>{children}</main>
      </section>
    </ObserverProvider>
  );
};

export default SingleBlogLayout;
