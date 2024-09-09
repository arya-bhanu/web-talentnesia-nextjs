'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
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

  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');

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
            isOpen: false,
            tabs: chapter.contents.map((content) => ({
              id: content.id,
              label: content.title,
              iconId: parseInt(content.type),
              content: content.body,
            })),
          }));

          setSections(formattedSections);
        } catch (error) {
          console.error('Error fetching course data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleTabClick = (tabId: string) => {
    setSelectedTab(tabId);

    const selectedSection = sections.flatMap(section => section.tabs).find(tab => tab.id === tabId);

    if (selectedSection) {
      switch (selectedSection.iconId) {
        case 1:
          setSelectedContent(<PdfReader url={selectedSection.content} />);
          break;
        case 2:
          setSelectedContent(<Media url={selectedSection.content} />);
          break;
        case 3:
          setSelectedContent(<Media url={selectedSection.content} />);
          break;
        case 4:
          setSelectedContent(<Media url={selectedSection.content} />);
          break;
        case 5:
          setSelectedContent(<Exam />);
          break;
        case 6:
          setSelectedContent(<Mentoring meetLink={selectedSection.content} />);
          break;
        default:
          setSelectedContent(null);
      }
    }
  };

  const handleSectionToggle = (sectionId: string) => {
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
    isLoading,
  };
};

export default useMaterialModul;
