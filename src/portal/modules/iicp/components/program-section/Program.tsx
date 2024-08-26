import React from 'react';
import { ProgramView } from './Program.view';

export const Program = ({ className, isLoading }: { className?: string, isLoading?: boolean }) => {
  return <ProgramView className={className} isLoading={isLoading}/>;
};
