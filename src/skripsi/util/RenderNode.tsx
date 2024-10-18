'use client';
import React, { ReactNode, useMemo } from 'react';
import Loading from '../components/Loading';
import Error from '../components/Error';
import NotAvailable from '../components/NotAvailable';

const RenderNode = ({
  children,
  isLoading,
  isError,
  data,
}: {
  children: ReactNode;
  isLoading: boolean;
  isError: boolean;
  data: any;
}) => {
  const child = useMemo(() => {
    if (isLoading) return <Loading />;
    if (isError) return <Error />;
    if (!data || data?.length === 0) return <NotAvailable />;
    return children;
  }, [data, isError, isLoading]);
  return child;
};

export default RenderNode;
