import React, { Dispatch, SetStateAction } from 'react';
import { Card } from 'flowbite-react';
import { TabFlex } from '@/backoffice/components/tabs/tabs';
import AccordionPanelDraggableView from './components/accordion-panel-draggable';
import { accordionData } from './components/accordion-panel-draggable/accordion.data';
import ModulProgres from './components/modul-progres';
import Certificate from './components/certificate/Certificate';
import { Certificate as CertificateType } from '../../courseDetail.type';

interface IModulView {
  activeAccordion: number;
  setActiveAccordion: Dispatch<SetStateAction<number>>;
  certificates: CertificateType[];
}

const ModulView = ({ activeAccordion, setActiveAccordion, certificates }: IModulView) => {
  const tabs = [
    {
      title: 'Modul',
      content: (
        <div>
          <ModulProgres progress={50} /> 
          {accordionData.map((accordion, index) => (
            <AccordionPanelDraggableView
              key={index}
              index={index}
              title={accordion.title}
              totalMinuteDuration={accordion.totalMinuteDuration}
              totalCurriculum={accordion.totalCurriculum}
              contents={accordion.contents}
              activeAccordion={activeAccordion}
              setActiveAccordion={setActiveAccordion}
            />
          ))}
        </div>
      ),
    },
    {
      title: 'Certificate',
      content: <Certificate certificates={certificates} />,
    },
  ];

  return (
    <Card>
      <TabFlex tabs={tabs} />
    </Card>
  );
};

export default ModulView;
