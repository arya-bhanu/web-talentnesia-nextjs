import { Spinner } from 'flowbite-react/components/Spinner';
import Image from 'next/image';
import React, { ReactNode } from 'react';

const LoadingView = ({
  children,
  isLoading,
}: {
  children?: ReactNode;
  isLoading: boolean;
}) => {
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex bg-[rgba(0,0,0,0.2)]">
          <div className="m-auto flex flex-col items-center">
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default LoadingView;
