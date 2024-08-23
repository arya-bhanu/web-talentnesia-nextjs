import React from 'react';
import { Modal } from 'flowbite-react';
import LabelForm from '@/backoffice/components/label-form';
import ModulProgress from '../modul-progres';
import AccordionPanelDraggable from '../accordion-panel-draggable/AccordionPanelDraggable';
import { CourseDetailProps } from './courseDetail.type';
import { accordionData } from './courseDetail.data';
import CourseSidebar from '../course-sidebar/CourseSidebar';
import { IListDraggable } from '../list-draggable/listDraggable.type';

const CourseDetailView: React.FC<CourseDetailProps> = ({
  openModal,
  setOpenModal,
}) => {
  const [activeAccordion, setActiveAccordion] = React.useState<number>(1);
  const [sidebarVisible, setSidebarVisible] = React.useState(false);
  const [selectedContent, setSelectedContent] = React.useState<IListDraggable | null>(null);
  const [selectedTitle, setSelectedTitle] = React.useState<string | null>(null);

  const handleContentClick = (content: IListDraggable, title: string) => {
    setSelectedContent(content);
    setSelectedTitle(title); 
    setSidebarVisible(true); 
  };

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)} size="5xl">
        <Modal.Header>Program Detail</Modal.Header>
        <Modal.Body>
          <div>
            <div className="flex items-center justify-between gap-10 mt-5">
              <ModulProgress progress={50} className="flex-1" />
            </div>
            <div className="mt-5">
              {accordionData.map((data, index) => (
                <AccordionPanelDraggable
                  key={index}
                  activeAccordion={activeAccordion}
                  setActiveAccordion={setActiveAccordion}
                  {...data}
                  contents={data.contents.map(content => ({
                    ...content,
                    onContentClick: () => handleContentClick(content, data.title), 
                  }))}
                />
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={sidebarVisible} onClose={() => setSidebarVisible(false)} size="5xl">
        <Modal.Header>Course Sidebar</Modal.Header>
        <Modal.Body>
          {selectedContent && (
            <CourseSidebar
              isSidebarVisible={sidebarVisible}
              setIsSidebarVisible={setSidebarVisible}
              content={selectedContent} 
              accordionData={accordionData} 
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CourseDetailView;
