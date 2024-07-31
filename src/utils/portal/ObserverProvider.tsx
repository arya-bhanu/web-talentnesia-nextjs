'use client';
import React, { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
import { createContext, useContext } from 'react';

interface ObserverContextValue {
  observerRef: (node?: Element | null) => void;
  inView: boolean;
  entry: IntersectionObserverEntry | undefined;
}

const ObserverContext = createContext<ObserverContextValue>({
  inView: false,
  observerRef: () => {},
  entry: undefined,
});

const ObserverProvider = ({ children }: { children: ReactNode }) => {
  const {
    ref: observerRef,
    inView,
    entry,
  } = useInView({
    /* Optional options */
    threshold: 0.5,
  });

  return (
    <ObserverContext.Provider value={{ observerRef, inView, entry }}>
      {children}
    </ObserverContext.Provider>
  );
};

export { ObserverContext };
export default ObserverProvider;
