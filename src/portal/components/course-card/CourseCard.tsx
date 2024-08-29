import React from "react";
import CourseCardView from "./CourseCard.view";
import { courseDataArray } from "./courseCard.data";

const CourseCard: React.FC = ({isLoading} : {isLoading?: boolean}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {courseDataArray.slice(0, 4).map((data, index) => (
        <CourseCardView key={index} {...data} isLoading={isLoading} />
      ))}
    </div>
  );
};

export default CourseCard;
