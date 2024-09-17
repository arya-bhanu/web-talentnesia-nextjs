import React, { Dispatch, SetStateAction } from 'react';
import { Card } from 'flowbite-react';
import { TabFlex, TabItem } from '@/backoffice/components/tabs/tabs';
import AccordionPanelDraggableView from './components/accordion-panel-draggable';
import ModulProgres from './components/modul-progres';
import Certificate from './components/certificate/Certificate';
import { Certificate as CertificateType, CourseData } from '../../courseDetail.type';

type TabTypes = 'modul' | 'certificate';

interface IModulView {
  activeAccordion: number;
  setActiveAccordion: Dispatch<SetStateAction<number>>;
  certificates: CertificateType[];
  course: CourseData;
}

const ModulView = ({ activeAccordion, setActiveAccordion, certificates, course }: IModulView) => {
  const [activeTab, setActiveTab] = React.useState<TabTypes>('modul');

  const tabs: TabItem<TabTypes>[] = [
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
      active: activeTab === 'modul',
    },
    {
      title: 'Certificate',
      content: <Certificate certificates={certificates} />,
      type: 'certificate',
      active: activeTab === 'certificate',
    },
  ];

  const handleTabChange = (tabType: TabTypes) => {
    setActiveTab(tabType);
  };

  return (
    <Card>
      <TabFlex tabs={tabs} onTabChange={handleTabChange} />
      <div className="mt-4">
        {tabs.find(tab => tab.type === activeTab)?.content}
      </div>
    </Card>
  );
};

export default ModulView;
