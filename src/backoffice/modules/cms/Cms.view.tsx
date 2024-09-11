'use client';
import { TabFlex } from '@/backoffice/components/tabs/tabs';
import { Card } from 'flowbite-react/components/Card';
import React from 'react';
import Blog from './blog';
import Campaign from './campaign';

const CmsView = () => {
  const tabs = [
    {
      title: 'Blog',
      content: <Blog />,
      active: true,
      type: 'blog',
    },
    {
      title: 'Campaign',
      content: <Campaign />,
      type: 'campaign',
    },
    {
      title: 'Pre-Release',
      content: <></>,
      type: 'pre-release',
    },
  ];
  return (
    <Card>
      <TabFlex tabs={tabs} />
    </Card>
  );
};

export default CmsView;
