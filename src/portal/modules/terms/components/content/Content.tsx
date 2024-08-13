import React from 'react';
import { ContentView } from './Content.view';
import clsx from 'clsx';

export const Content = ({ className }: { className?: string }) => {
  return <ContentView className={clsx(className)} />;
};
