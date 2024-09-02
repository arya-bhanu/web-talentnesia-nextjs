'use client';
import React, { useState, useEffect } from 'react';

interface CanProps {
  action: string;
  children: React.ReactNode;
}

const Can: React.FC<CanProps> = ({ action, children }) => {
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const response = await fetch(`/api-permission/${action}`);
        const data = await response.json();
        setIsAllowed(data.isAllowed);
      } catch (error) {
        console.error('Error checking permission', error);
        setError('Failed to check permission');
        setIsAllowed(false);
      }
    };

    checkPermission();
  }, [action]);

  if (isAllowed === null) {
    return <div>Loading...</div>;
  }

  if (isAllowed === false) {
    return null;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <>{children}</>;
};

export default Can;
