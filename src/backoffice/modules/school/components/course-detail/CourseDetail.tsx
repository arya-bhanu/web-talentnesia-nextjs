// CourseDetail.tsx

import React from 'react';
import CourseDetailView from './CourseDetail.view';
import { CourseDetailProps } from './courseDetail.type';

const CourseDetail: React.FC<CourseDetailProps> = (props) => {
  return <CourseDetailView {...props} />;
};

export default CourseDetail;
