'use client'
import React from 'react';
import Hero from './components/hero';
import PopularCourses from './components/popular-courses';
import BestCourse from './components/best-courses';
import AllClass from '@/portal/components/all-class/AllClass';
import { courseDataArray } from '@/portal/components/course-card/courseCard.data';
import { filterCategories } from '@/portal/components/filter/filter.data';
import { CoursesViewProps } from './course.type';


const CourseView: React.FC<CoursesViewProps> = ({ data, isLoading }) => {

  return (
    <>
      <Hero isLoading={isLoading} />
      <main className="container">
       <PopularCourses courses={data.items} className='mb-16' isLoading={isLoading}/>
       <BestCourse courses={data.items} isLoading={isLoading}/>
       <AllClass courses={data.items} filterOptions={filterCategories} isLoading={isLoading} title='Jelajahi Semua Kelas'/>
      </main>
    </>
  );
};

export default CourseView;
