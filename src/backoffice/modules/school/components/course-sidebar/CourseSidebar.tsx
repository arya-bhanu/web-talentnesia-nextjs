import React, { useState } from 'react';
import Mentoring from './mentoring/Mentoring.view';
import PdfReader from './pdf/PdfReader.view';
import PlayCircle from '@/../public/icons/play-circle.svg';
import Book from '@/../public/icons/manage-program/book.svg';
import Edit2 from '@/../public/icons/edit-2.svg';
import VideoCam from '@/../public/icons/videocam.svg';
import PlusIcon from '@/../public/icons/plus.svg';
import MinusIcon from '@/../public/icons/minus.svg';
import { Chapter, ProgramDetail, ChapterContent } from '../../detail-school/components/list-program-card/listProgramCard.type';
import Exam from './exam/exam.view';
import Media from './media/media.view';

interface CourseSidebarProps {
  isSidebarVisible: boolean;
  setIsSidebarVisible: (visible: boolean) => void;
  content: ProgramDetail;
}

const iconMap: { [key: string]: React.ReactNode } = {
  '1': <PlayCircle />,
  '2': <Book />,
  '3': <Edit2 />,
  '4': <VideoCam />,
};

const CourseSidebar: React.FC<CourseSidebarProps> = ({
  isSidebarVisible,
  setIsSidebarVisible,
  content,
}) => {
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [activeContent, setActiveContent] = useState<ChapterContent | null>(null);
  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>({});

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleItemClick = (chapter: Chapter, item: ChapterContent) => {
    setActiveChapter(chapter);
    setActiveContent(item);
  };

  const renderContent = () => {
    if (!activeContent) return null;

    switch (activeContent.type) {
      case '1':
        return <Media url={activeContent.body || ''} />;
      case '2':
        return <PdfReader url={activeContent.body || ''} />;
      case '3':
        return <Exam />;
      case '4':
        return <Mentoring />;
      default:
        return <Exam />;
    }
  };

  return (
    <div className="flex h-full">
      <div className="w-1/4 border-r p-2">
        {content.chapters.map((chapter, index) => (
          <div key={index} className="mb-4">
            <button
              onClick={() => toggleSection(index)}
              className="mr-2 flex items-center justify-between"
            >
              {openSections[index] ? <MinusIcon /> : <PlusIcon />}
              <h3 className="text-md font-semibold flex-1">{chapter.title}</h3>
            </button>
            {openSections[index] && (
              <div className="flex flex-col gap-1 pl-10">
                {chapter.contents.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleItemClick(chapter, item)}
                    className={`flex items-center gap-2 mb-4 cursor-pointer p-2 rounded ${
                      activeContent?.id === item.id ? 'bg-blue-300 text-white' : 'bg-transparent'
                    }`}
                  >
                    {iconMap[item.type] || <span className="text-gray-500">No Icon</span>}
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
};

export default CourseSidebar;
