import React from 'react';
import { ICoursesProgress } from './coursesProgress.type';
import CoursesProgressView from './CoursesProgress.view';

const CoursesProgress: React.FC<ICoursesProgress> = (props) => {
  return <CoursesProgressView {...props} />;
};

export default CoursesProgress;
