'use client';
import { TabFlex } from '@/backoffice/components/tabs/tabs';
import React from 'react';
import Blog from './blog';
import Campaign from './campaign';

const CmsView = () => {
  const tabs = [
    {
      title: 'Blog',
      content: <Blog />,
      active: true,
    },
    {
      title: 'Campaign',
      content: <Campaign />,
    },
    {
      title: 'Pre-Release',
      content: <></>,
    },
  ];
  return (
    <div>
      <TabFlex tabs={tabs} />
    </div>
  );
};

export default CmsView;
