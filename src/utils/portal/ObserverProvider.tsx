'use client';
import React, { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
import { createContext } from 'react';

interface ObserverContextValue {
  headerObserver: {
    observerRef: (node?: Element | null) => void;
    inView: boolean;
    entry: IntersectionObserverEntry | undefined;
  };
}

const ObserverContext = createContext<ObserverContextValue>({
  headerObserver: {
    inView: false,
    observerRef: () => {},
    entry: undefined,
  },
});

const ObserverProvider = ({ children }: { children: ReactNode }) => {
  const {
    ref: headerObserverRef,
    inView: headerInView,
    entry: headerEntry,
  } = useInView({ threshold: 0.2 });

  return (
    <ObserverContext.Provider
      value={{
        headerObserver: {
          observerRef: headerObserverRef,
          entry: headerEntry,
          inView: headerInView,
        },
      }}
    >
      {children}
    </ObserverContext.Provider>
  );
};

export { ObserverContext };
export default ObserverProvider;
