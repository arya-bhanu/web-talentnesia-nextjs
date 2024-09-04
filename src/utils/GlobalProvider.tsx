  'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import ToasterProvider from './ToasterProvider';

const queryClient = new QueryClient();
const GlobalProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToasterProvider>{children}</ToasterProvider>
    </QueryClientProvider>
  );
};

export default GlobalProvider;
