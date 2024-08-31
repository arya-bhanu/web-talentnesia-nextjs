'use client'
import React from 'react';
import Hero from './components/hero';
import PopularCourses from './components/popular-courses';
import BestCourse from './components/best-courses';
import AllClass from './components/all-class';
import { courseDataArray } from '@/portal/components/course-card/courseCard.data';
import { filterCategories } from '@/portal/components/filter/filter.data';
import { CoursesViewProps } from './course.type';


const CourseView: React.FC<CoursesViewProps> = ({ data }) => {

  const [skeletonAnimation, setTime] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTime(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Hero isLoading={skeletonAnimation} />
      <main className="container">
       <PopularCourses courses={data?.courses} className='mb-16' isLoading={skeletonAnimation}/>
       <BestCourse courses={data?.courses} isLoading={skeletonAnimation}/>
       <AllClass courses={courseDataArray} filterOptions={filterCategories} isLoading={skeletonAnimation}/>
      </main>
    </>
  );
};

export default CourseView;
