import React, { ReactNode } from 'react';
import LoadingView from './Loading.view';

const Loading = ({
  children,
  isLoading,
}: {
  children?: ReactNode;
  isLoading: boolean;
}) => {
  return <LoadingView isLoading={isLoading} children={children} />;
};

export default Loading;
