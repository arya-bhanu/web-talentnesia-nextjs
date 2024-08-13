'use client';

import React, { useState } from 'react';
import { AccordionView } from './Accordion.view';
import { AccordionData } from './accordion.data';

export const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <AccordionView
      accordionData={AccordionData}
      activeIndex={activeIndex}
      toggleAccordion={toggleAccordion}
    />
  );
};
