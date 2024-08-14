'use client'
import React from 'react';
import { useHomeData } from '../home';
import Hero from './components/hero';
import PopularCourses from './components/popular-courses';
import BestCourse from './components/best-courses';
import AllClass from './components/all-class';
import { courseDataArray } from '@/portal/components/course-card/courseCard.data';
import { filterCategories } from '@/portal/components/filter/filter.data';


const CourseView = () => {
  const { data, isLoading, error } = useHomeData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

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
