import React, { useEffect, useState } from 'react';
import Mentoring from './mentoring/Mentoring.view';
import PdfReader from './pdf/PdfReader.view';
import PlayCircle from '@/../public/icons/play-circle.svg';
import Book from '@/../public/icons/manage-program/book.svg';
import Edit2 from '@/../public/icons/edit-2.svg';
import VideoCam from '@/../public/icons/videocam.svg';
import PlusIcon from '@/../public/icons/plus.svg';   
import MinusIcon from '@/../public/icons/minus.svg'; 
import { IListDraggable } from '../list-draggable/listDraggable.type';
import { IAccordionPanelDraggable } from '../accordion-panel-draggable/accordionPanelDraggable.type';
import Exam from './exam/exam.view';
import Media from './media/media.view';

interface CourseSidebarProps {
  isSidebarVisible: boolean;
  setIsSidebarVisible: (visible: boolean) => void;
  content: IListDraggable | null;
  accordionData: Omit<IAccordionPanelDraggable, 'activeAccordion' | 'setActiveAccordion'>[];
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
  accordionData,
}) => {
  const [activeContent, setActiveContent] = useState<IListDraggable | null>(null);
  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (content) {
      setActiveContent(content);

      const courseIndex = accordionData.findIndex((course) =>
        course.contents.some((item) => 
          item.title === content.title && item.date === content.date
        )
      );

      if (courseIndex !== -1) {
        setOpenSections({ [courseIndex]: true });
      }
    }
  }, [content, accordionData]);

  const handleItemClick = (item: IListDraggable, uniqueIdentifier: string) => {
    setActiveContent(item); 
  };

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index], 
    }));
  };

  const renderContent = () => {
    switch (activeContent?.type) {
      case '1': 
        return <Media url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />;
      case '2': 
        return <PdfReader url="https://repository.uinjkt.ac.id/dspace/bitstream/123456789/67067/1/MUZAYIN%20MUSRI-FST.pdf" />;
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
        {accordionData.map((course, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => toggleSection(index)}
                className="mr-2" 
              >
                {openSections[index] ? <MinusIcon /> : <PlusIcon />} 
              </button>
              <h3 className="text-md font-semibold flex-1">{course.title}</h3>
            </div>
            {openSections[index] && (
              <div className="flex flex-col gap-1 pl-10"> 
                {course.contents.map((item, idx) => {
                  const uniqueIdentifier = `${index}-${item.type}-${item.title}-${idx}`;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleItemClick(item, uniqueIdentifier)}
                      className={`flex items-center gap-2 mb-4 cursor-pointer p-2 rounded ${
                        activeContent?.title === item.title &&
                        activeContent?.type === item.type &&
                        activeContent?.date === item.date
                          ? 'bg-blue-300 text-white'
                          : 'bg-transparent'
                      }`}
                    >
                      {iconMap[item.type] || <span className="text-gray-500">No Icon</span>}
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
  
      <div className="flex-1 p-6">
        {renderContent()}
      </div>
    </div>
  );  
};

export default CourseSidebar;
