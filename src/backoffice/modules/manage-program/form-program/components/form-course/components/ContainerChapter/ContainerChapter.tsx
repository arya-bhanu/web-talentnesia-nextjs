import React, { useState } from 'react';
import ContainerChapterView from './ContainerChapter.view';

const ContainerChapter = () => {
  const [activeAccordion, setActiveAccordion] = useState(-1);
  return (
    <ContainerChapterView
      activeAccordion={activeAccordion}
      setActiveAccordion={setActiveAccordion}
    />
  );
};

export default ContainerChapter;
