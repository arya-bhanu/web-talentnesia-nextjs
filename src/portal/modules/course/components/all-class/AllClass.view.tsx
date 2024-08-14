import React, { useState } from 'react';
import FilterView from '@/portal/components/filter/Filter.view';
import CourseCardView from '@/portal/components/course-card/CourseCard.view';
import { AllClassProps } from './allClass.type';
import SearchBar from '@/portal/components/search-bar';
import Pagination from '@/portal/components/pagination';
import DropdownCourse from '@/portal/components/dropdown-course/DropsownCourse';

const AllClassView: React.FC<AllClassProps> = ({ filterOptions, courses }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; 
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const indexOfLastCourse = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2 md:mt-20">
      <div className="md:w-1/4">
        <FilterView filterCategories={filterOptions} />
      </div>
      <div className="md:w-3/4">
        <div className="flex items-center justify-between mb-6 space-x-4">
          <SearchBar
            placeHolder="Jelajahi Kursus"
            className="w-full md:max-w-60 lg:max-w-80 border-none"
          />
          <div className="flex items-center space-x-4 md:space-x-6">
            <p className="hidden md:block text-gray-700 font-medium text-sm md:text-base">
              Sort By
            </p>
            <DropdownCourse />
          </div>
        </div>
        <div className="grid gap-4">
          {currentCourses.map((course, index) => (
            <CourseCardView key={index} {...course} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AllClassView;
