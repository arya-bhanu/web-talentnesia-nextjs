import React from 'react';
import AllCourseView from './AllCourse.view';
import { AllCourseProps } from './allCourse.type';

const AllCourse: React.FC<AllCourseProps> = (props) => {
  return <AllCourseView {...props} />;
};

export default AllCourse;
