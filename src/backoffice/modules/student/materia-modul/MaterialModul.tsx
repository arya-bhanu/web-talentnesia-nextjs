'use client';

import { useState } from 'react';
import { SectionItem, TabItem } from './materialModul.type';
import { initialSections } from './materialModul.data';
import Exam from './components/course-sidebar/exam/exam.view';
import Media from './components/course-sidebar/media/media.view';
import Mentoring from './components/course-sidebar/mentoring/Mentoring.view';
import PdfReader from './components/course-sidebar/pdf/PdfReader.view';

const useMaterialModul = () => {
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [sections, setSections] = useState<SectionItem[]>(initialSections);
  const [selectedContent, setSelectedContent] = useState<JSX.Element | null>(null); 

  const handleTabClick = (tabId: string) => {
    setSelectedTab(tabId);

    const selectedSection = sections.flatMap(section => section.tabs).find(tab => tab.id === tabId);

    if (selectedSection) {
      switch (selectedSection.iconId) {
        case 1:
          setSelectedContent(<Media url={selectedSection.content} />);
          break;
        case 2:
          setSelectedContent(<PdfReader url={selectedSection.content} />);
          break;
        case 3:
          setSelectedContent(<Exam />);
          break;
        case 4:
          setSelectedContent(<Mentoring meetLink={selectedSection.content} />);
          break;
        case 5: 
          setSelectedContent(<PdfReader url={selectedSection.content} />);
          break;
        default:
          setSelectedContent(null);
      }
    }
  };

  const handleSectionToggle = (sectionId: number) => {
    setSections(prevSections => prevSections.map(section => 
      section.id === sectionId ? { ...section, isOpen: !section.isOpen } : section
    ));
  };

  return {
    selectedTab,
    isSidebarVisible,
    handleTabClick,
    setIsSidebarVisible,
    handleSectionToggle,
    sections,
    selectedContent, 
  };
};


export default useMaterialModul;
