import { useState } from 'react';
import { TabItem, SectionItem } from './detail.type';
import { sections as initialSections } from './detail.data';

const useDetail = () => {
  const [selectedTab, setSelectedTab] = useState<number | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [sections, setSections] = useState<SectionItem[]>(initialSections);

  const handleTabClick = (tabId: number) => {
    setSelectedTab(tabId);
  };

  const handleSectionToggle = (sectionId: number) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? { ...section, isOpen: !section.isOpen }
          : section
      )
    );
  };

  const renderTabContent = () => {
    const selectedTabData = sections.flatMap(section => section.tabs).find((tab) => tab.id === selectedTab);
    return (
      <div>
        {selectedTabData ? (
          <div>
            <h3 className="text-xl font-semibold mb-4">{selectedTabData.label}</h3>
            <p>{selectedTabData.content}</p>
          </div>
        ) : (
          <p>Select a tab to view content</p>
        )}
      </div>
    );
  };

  return {
    selectedTab,
    isSidebarVisible,
    handleTabClick,
    handleSectionToggle,
    renderTabContent,
    setIsSidebarVisible,
    sections,
  };
};

export default useDetail;
