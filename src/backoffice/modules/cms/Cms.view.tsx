'use client';

import React from 'react';
import { TabFlex, TabItem } from '../../components/tabs/tabs';
import Blog from './blog';
import Campaign from './campaign';
type TabTypes = 'blog' | 'campaign' | 'preRelease';

const CmsView: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<TabTypes>('blog');

  const tabs: TabItem<TabTypes>[] = [
    {
      title: 'Blog',
      content: <Blog />,
      type: 'blog',
      active: activeTab === 'blog',
    },
    {
      title: 'Campaign',
      content: <Campaign />,
      type: 'campaign',
      active: activeTab === 'campaign',
    },
    {
      title: 'Pre-Release',
      content: <></>,
      type: 'preRelease',
      active: activeTab === 'preRelease',
    },
  ];

  const handleTabChange = (tabType: TabTypes) => {
    setActiveTab(tabType);
  };

  return (
    <div className="cms-container">
      <TabFlex tabs={tabs} onTabChange={handleTabChange} />
      <div className="mt-4">
        {tabs.find(tab => tab.type === activeTab)?.content}
      </div>
    </div>
  );
};

export default CmsView;
