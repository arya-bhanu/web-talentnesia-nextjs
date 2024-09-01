'use client';
import React, { useState } from 'react';
import HistoryView from './History.view';

const History = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <HistoryView
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );
};

export default History;
