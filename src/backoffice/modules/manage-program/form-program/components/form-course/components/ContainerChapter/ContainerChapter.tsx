import React, { useState } from 'react';
import ContainerChapterView from './ContainerChapter.view';

const ContainerChapter = ({ className }: { className?: string }) => {
  const [activeAccordion, setActiveAccordion] = useState(-1);
  return (
    <ContainerChapterView
      className={className}
      activeAccordion={activeAccordion}
      setActiveAccordion={setActiveAccordion}
    />
  );
};

export default ContainerChapter;
