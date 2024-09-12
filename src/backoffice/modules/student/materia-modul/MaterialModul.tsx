'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SectionItem, TabItem } from './materialModul.type';
import { StudentCourseAPI } from '../course/api/studentCourseApi';
import Exam from './components/course-sidebar/exam/exam.view';
import Media from './components/course-sidebar/media/media.view';
import Mentoring from './components/course-sidebar/mentoring/Mentoring.view';
import PdfReader from './components/course-sidebar/pdf/PdfReader.view';
import Assignment from './components/course-sidebar/assignment/Assignment';

const useMaterialModul = () => {
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [sections, setSections] = useState<SectionItem[]>([]);
  const [selectedContent, setSelectedContent] = useState<JSX.Element | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [isExamCompleted, setIsExamCompleted] = useState(false);


  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = searchParams.get('courseId');
  const chapterId = searchParams.get('chapterId');
  const contentId = searchParams.get('contentId');

  const selectInitialContent = (sections: SectionItem[], contentId: string | null) => {
    if (contentId) {
      const selectedSection = sections.find(section => 
        section.tabs.some(tab => tab.id === contentId)
      );
      if (selectedSection) {
        const selectedTab = selectedSection.tabs.find(tab => tab.id === contentId);
        if (selectedTab) {
          setSelectedTab(contentId);
          switch (selectedTab.iconId) {
            case 1:
              setSelectedContent(<PdfReader url={selectedTab.content} />);
              break;
            case 2:
              setSelectedContent(<Media url={selectedTab.content} />);
              break;
            case 3:
              setSelectedContent(<img src={selectedTab.content || ''} alt="Content" className="max-w-full h-auto" />);
              break;
            case 4:
              setSelectedContent(<Media url={selectedTab.content} />);
              break;
            case 5:
              setSelectedContent(<Exam contentId={contentId} />);
              break;
            case 6:
              setSelectedContent(<Mentoring meetLink={selectedTab.content} />);
              break;
            default:
              setSelectedContent(null);
          }
        }
      }
    }
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      if (courseId) {
        try {
          setIsLoading(true);
          const response = await StudentCourseAPI.fetchDetail(courseId);
          const { chapters } = response.data.course;
  
          const formattedSections: SectionItem[] = chapters.map((chapter) => ({
            id: chapter.id,
            title: chapter.title,
            duration: chapter.duration ? Number(chapter.duration) : null,
            isOpen: chapter.id === chapterId,
            tabs: chapter.contents.map((content) => ({
              id: content.id,
              label: content.title,
              iconId: parseInt(content.type),
              content: content.body,
              isCompleted: content.isCompleted,
            })),
          }));
  
          setSections(formattedSections);
          selectInitialContent(formattedSections, contentId);
          
          // Set isExamCompleted based on the selected content
          const selectedContent = formattedSections.flatMap(s => s.tabs).find(t => t.id === contentId);
          setIsExamCompleted(selectedContent?.isCompleted === 1);
        } catch (error) {
          console.error('Error fetching course data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
  
    fetchCourseData();
  }, [courseId, chapterId, contentId]);
  

  const isExamContent = selectedTab && sections.some(section => 
    section.tabs.some(tab => tab.id === selectedTab && tab.iconId === 5)
  );

  const handleTabClick = async (tabId: string) => {
    if (tabId === selectedTab) return;

    setSelectedTab(tabId);
    setIsContentLoading(true);

    const selectedSection = sections.find(section => 
      section.tabs.some(tab => tab.id === tabId)
    );

    if (selectedSection) {
      const selectedTab = selectedSection.tabs.find(tab => tab.id === tabId);
      if (selectedTab) {
        router.push(`/student/course/course-detail/material-modul/?courseId=${courseId}&chapterId=${selectedSection.id}&contentId=${tabId}`);

        await new Promise(resolve => setTimeout(resolve, 300));

        switch (selectedTab.iconId) {
          case 1:
            setSelectedContent(<PdfReader url={selectedTab.content} />);
            break;
          case 2:
            setSelectedContent(<Media url={selectedTab.content} />);
            break;
          case 3:
            setSelectedContent(<img src={selectedTab.content || ''} alt="Content" className="max-w-full h-auto" />);

            break;
          case 4:
            setSelectedContent(<Media url={selectedTab.content} />);
            break;
          case 5:
            setSelectedContent(<Exam contentId={tabId} />);
            break;
          case 6:
            setSelectedContent(<Mentoring meetLink={selectedTab.content} />);
            break;
          default:
            setSelectedContent(null);
        }
      }
    }

    setIsContentLoading(false);
  };

  const handleSectionToggle = (sectionId: string) => {
    setSections(prevSections => prevSections.map(section => 
      section.id === sectionId ? { ...section, isOpen: !section.isOpen } : section
    ));
  };

  const handleNextContent = async () => {
    if (selectedTab) {
      const currentContent = sections.flatMap(s => s.tabs).find(t => t.id === selectedTab);
      if (currentContent && currentContent.isCompleted !== 1) {
        try {
          await StudentCourseAPI.checkAndNext(selectedTab);
        } catch (error) {
          console.error('Error marking content as complete:', error);
        }
      }
      
      // Navigate to the next content
      const currentSectionIndex = sections.findIndex(section => 
        section.tabs.some(tab => tab.id === selectedTab)
      );
      const currentSection = sections[currentSectionIndex];
      const currentTabIndex = currentSection.tabs.findIndex(tab => tab.id === selectedTab);
  
      if (currentTabIndex < currentSection.tabs.length - 1) {
        // Next tab in the same section
        handleTabClick(currentSection.tabs[currentTabIndex + 1].id);
      } else if (currentSectionIndex < sections.length - 1) {
        // First tab of the next section
        const nextSection = sections[currentSectionIndex + 1];
        handleTabClick(nextSection.tabs[0].id);
      }
    }
  };

  const handlePreviousContent = () => {
    const currentSectionIndex = sections.findIndex(section => 
      section.tabs.some(tab => tab.id === selectedTab)
    );
    const currentSection = sections[currentSectionIndex];
    const currentTabIndex = currentSection.tabs.findIndex(tab => tab.id === selectedTab);

    if (currentTabIndex > 0) {
      // Previous tab in the same section
      handleTabClick(currentSection.tabs[currentTabIndex - 1].id);
    } else if (currentSectionIndex > 0) {
      // Last tab of the previous section
      const previousSection = sections[currentSectionIndex - 1];
      handleTabClick(previousSection.tabs[previousSection.tabs.length - 1].id);
    }
  };

  

  return {
    selectedTab,
    isSidebarVisible,
    handleTabClick,
    setIsSidebarVisible,
    handleSectionToggle,
    sections,
    selectedContent,
    isLoading,
    isContentLoading,
    handleNextContent,
    handlePreviousContent,
    isExamCompleted,
    isExamContent,
  };
};

export default useMaterialModul;
