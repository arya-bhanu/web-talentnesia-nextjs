import React, { useState } from 'react';
import ChapterView from './Chapter.view';
import { IChapter } from './chapter.type';

const Chapter: React.FC<IChapter> = (props) => {
  const [activeAccordion, setActiveAccordion] = useState(-1);
  return (
    <ChapterView
      {...props}
      activeAccordion={activeAccordion}
      setActiveAccordion={setActiveAccordion}
    />
  );
};

export default Chapter;
