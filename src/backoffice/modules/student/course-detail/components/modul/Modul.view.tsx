import React, { Dispatch, SetStateAction } from 'react';
import { Card } from 'flowbite-react';
import { TabFlex } from '@/backoffice/components/tabs/tabs';
import AccordionPanelDraggableView from './components/accordion-panel-draggable';
import { accordionData } from './components/accordion-panel-draggable/accordion.data';
import ModulProgres from './components/modul-progres';
import Certificate from './components/certificate/Certificate';

interface IModulView {
  activeAccordion: number;
  setActiveAccordion: Dispatch<SetStateAction<number>>;
}

const ModulView = ({ activeAccordion, setActiveAccordion }: IModulView) => {
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
      content: <div>
        <Certificate />
      </div>,
    },
  ];

  return (
    <Card>
      <TabFlex tabs={tabs} />
    </Card>
  );
};

export default ModulView;
