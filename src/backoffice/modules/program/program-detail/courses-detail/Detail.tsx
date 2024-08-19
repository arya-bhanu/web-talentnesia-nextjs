'use client';

import React, { useState } from 'react';
import { SectionItem } from '@/backoffice/components/course-sidebar/courseSidebar.type';
import { initialSections } from './detail.data';
import Mentoring from '@/backoffice/components/course-sidebar/mentoring/Mentoring.view';

const useDetail = () => {
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [sections, setSections] = useState<SectionItem[]>(initialSections);

  const handleTabClick = (tabId: string) => {
    setSelectedTab(tabId);
  };

  const handleSectionToggle = (sectionId: number) => {
    setSections(prevSections => prevSections.map(section => 
      section.id === sectionId ? { ...section, isOpen: !section.isOpen } : section
    ));
  };

  const renderTabContent = (): React.ReactNode => {
    const selectedTabData = sections.flatMap(section => section.tabs).find(tab => tab.id === selectedTab);
    
    if (selectedTabData?.iconId === 4) {
      return <Mentoring />;
    }
    
    return <div>Content for tab: {selectedTab}</div>;
  };

  return {
    selectedTab,
    isSidebarVisible,
    handleTabClick,
    renderTabContent,
    setIsSidebarVisible,
    handleSectionToggle,
    sections,
  };
};

export default useDetail;
