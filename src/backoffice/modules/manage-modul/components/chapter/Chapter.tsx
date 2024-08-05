import React from 'react';
import ChapterView from './Chapter.view';
import { IChapter } from './chapter.type';

const Chapter: React.FC<IChapter> = (props) => {
  return <ChapterView {...props} />;
};

export default Chapter;
