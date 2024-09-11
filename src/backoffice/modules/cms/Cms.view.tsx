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
    <Card>
      <TabFlex tabs={tabs} />
    </Card>
  );
};

export default CmsView;
