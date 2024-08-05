import React from 'react';
import { ContentView } from './Content.view';
import { contentData } from './content.data';
import clsx from 'clsx';

export const Content = ({ className }: { className?: string }) => {
  return (
    <ContentView className={clsx(className)} />
  );
};
