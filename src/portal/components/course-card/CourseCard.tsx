import React from "react";
import CourseCardView from "./CourseCard.view";
import { courseDataArray } from "./courseCard.data";
import { CourseCardProps } from "./courseCard.type";

const CourseCard = ({isLoading, course} : {isLoading?: boolean, course: CourseCardProps[]}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {course.map((data, index) => (
        <CourseCardView key={index} {...data} isLoading={isLoading} />
      ))}
    </div>
  );
};

export default CourseCard;
