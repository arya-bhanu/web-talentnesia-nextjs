import React, { Dispatch, SetStateAction } from 'react';
import { Card } from 'flowbite-react';
import { TabFlex } from '@/backoffice/components/tabs/tabs';
import AccordionPanelDraggableView from './components/accordion-panel-draggable';
import ModulProgres from './components/modul-progres';
import Certificate from './components/certificate/Certificate';
import { Certificate as CertificateType, CourseData } from '../../courseDetail.type';

interface IModulView {
  activeAccordion: number;
  setActiveAccordion: Dispatch<SetStateAction<number>>;
  certificates: CertificateType[];
  course: CourseData;
}

const ModulView = ({ activeAccordion, setActiveAccordion, certificates, course }: IModulView) => {
  const tabs = [
    {
      title: 'Modul',
      content: (
        <div>
          <ModulProgres progress={course.progress} />
          {course.chapters.map((chapter, index) => (
            <AccordionPanelDraggableView
              key={chapter.id}
              {...chapter}
              index={index}
              activeAccordion={activeAccordion}
              setActiveAccordion={setActiveAccordion}
              courseId={course.id}
            />
          ))}
        </div>
      ),
      type: 'modul',
    },
    {
      title: 'Certificate',
      content: <Certificate certificates={certificates} />,
      type: 'certificate', // Add this line
    },
  ];
  

  return (
    <Card>
      <TabFlex tabs={tabs} />
    </Card>
  );
};

export default ModulView;
