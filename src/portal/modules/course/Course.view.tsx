'use client'
import React from 'react';
import Hero from './components/hero';
import PopularCourses from './components/popular-courses';
import BestCourse from './components/best-courses';
import AllClass from './components/all-class';
import { courseDataArray } from '@/portal/components/course-card/courseCard.data';
import { filterCategories } from '@/portal/components/filter/filter.data';
import { getHomeData } from '../home/hooks/getHomeData';


const CourseView = async () => {
  const data = await getHomeData();

  return (
    <>
      <Hero />
      <main className="container">
       <PopularCourses courses={data.courses} className='mb-16'/>
       <BestCourse courses={data.courses}/>
       <AllClass courses={courseDataArray} filterOptions={filterCategories} />
      </main>
    </>
  );
};

export default CourseView;
