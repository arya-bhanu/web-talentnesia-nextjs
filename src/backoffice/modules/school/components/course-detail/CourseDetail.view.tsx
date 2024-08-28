import React from 'react';
import { Modal } from 'flowbite-react';
import ModulProgress from '../modul-progres';
import AccordionPanelDraggable from '../accordion-panel-draggable/AccordionPanelDraggable';
import { CourseDetailProps, CourseData, Content } from './courseDetail.type';
import CourseSidebar from '../course-sidebar/CourseSidebar';
import { IListDraggable } from '../list-draggable/listDraggable.type';

interface CourseDetailViewProps extends CourseDetailProps {
  courseData: CourseData | null;
  loading: boolean;
}

const CourseDetailView: React.FC<CourseDetailViewProps> = ({
  openModal,
  setOpenModal,
  courseData,
  loading,
}) => {
  const [activeAccordion, setActiveAccordion] = React.useState<number>(1);
  const [sidebarVisible, setSidebarVisible] = React.useState(false);
  const [selectedContent, setSelectedContent] =
    React.useState<IListDraggable | null>(null);
  const [selectedTitle, setSelectedTitle] = React.useState<string | null>(null);

  const handleContentClick = (content: Content, title: string) => {
    const listDraggableContent: IListDraggable = {
      id: content.id,
      title: content.title,
      type: content.type,
      duration: content.duration,
      date: content.date,
      durationMinute: parseInt(content.duration) || 0, // Add this line
    };
    setSelectedContent(listDraggableContent);
    setSelectedTitle(title);
    setSidebarVisible(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!courseData) {
    return <div>No course data available</div>;
  }

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)} size="5xl">
        <Modal.Header>{courseData.name}</Modal.Header>
        <Modal.Body>
          <div>
            <div className="flex items-center justify-between gap-10 mt-5">
              <ModulProgress
                progress={courseData.progress}
                className="flex-1"
              />
            </div>
            <div className="mt-5">
              {courseData.chapters.map((chapter, index) => (
                <AccordionPanelDraggable
                  key={chapter.id}
                  index={index}
                  activeAccordion={activeAccordion}
                  setActiveAccordion={setActiveAccordion}
                  title={chapter.title}
                  contents={chapter.contents.map((content) => ({
                    id: content.id,
                    title: content.title,
                    type: content.type,
                    duration: content.duration,
                    date: content.date,
                    durationMinute: parseInt(content.duration) || 0, // Add this line
                    onContentClick: () =>
                      handleContentClick(content, chapter.title),
                  }))}
                />
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        size="5xl"
      >
        <Modal.Header>Course Sidebar</Modal.Header>
        <Modal.Body>
          {selectedContent && courseData && (
            <CourseSidebar
              isSidebarVisible={sidebarVisible}
              setIsSidebarVisible={setSidebarVisible}
              content={selectedContent}
              accordionData={courseData.chapters}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CourseDetailView;
