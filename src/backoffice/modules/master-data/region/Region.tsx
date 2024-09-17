"use client";

import React from 'react';
import { TabFlex, TabItem } from '../../../components/tabs/tabs';
import Province from './province';
import District from './district';
import SubDistrict from './sub-disctrict';
import ZipCode from './zip-code';

type TabTypes = 'province' | 'district' | 'subDistrict' | 'zipCode';

const Region: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<TabTypes>('province');

  const tabs: TabItem<TabTypes>[] = [
    {
      title: 'Province',
      content: <Province />,
      type: 'province',
      active: activeTab === 'province',
    },
    {
      title: 'District',
      content: <District />,
      type: 'district',
      active: activeTab === 'district',
    },
    {
      title: 'Sub District',
      content: <SubDistrict />,
      type: 'subDistrict',
      active: activeTab === 'subDistrict',
    },
    {
      title: 'Zip Code',
      content: <ZipCode />,
      type: 'zipCode',
      active: activeTab === 'zipCode',
    },
  ];

  const handleTabChange = (tabType: TabTypes) => {
    setActiveTab(tabType);
  };

  return (
    <div className="region-container">
      <TabFlex tabs={tabs} onTabChange={handleTabChange} />
      <div className="mt-4">
        {tabs.find(tab => tab.type === activeTab)?.content}
      </div>
    </div>
  );
};

export default Region;
