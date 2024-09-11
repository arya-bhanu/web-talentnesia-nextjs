'use client'

import React from 'react';
import Province from './province';
import District from './district';
import SubDistrict from './sub-disctrict';
import ZipCode from './zip-code';
import dynamic from 'next/dynamic';

const TabFlex = dynamic(() => import('@/backoffice/components/tabs/tabs').then(mod => mod.TabFlex), {
  ssr: false,
});

const Region: React.FC = () => {
  const tabs = [
    {
      title: 'Province',
      content: <Province />,
      active: true,
      type: 'province',
    },
    {
      title: 'District',
      content: <District />,
    },
    {
      title: 'Sub-District',
      content: <SubDistrict />,
      type: 'sub-district',
    },
    {
      title: 'Zip Code',
      content: <ZipCode />,
      type: 'zip-code',
    },
  ];

  return <TabFlex tabs={tabs} />;
};

export default Region;
