import { createContext } from 'react';
import { HeaderObserver } from './header.type';

export const ObserverContext = createContext<{
  headerObserver: HeaderObserver;
}>({
  headerObserver: { inView: true }, // default value
});
