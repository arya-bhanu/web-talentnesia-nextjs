import React, { useState } from 'react';
import FilterView from '@/portal/components/filter/Filter.view';
import FeatureCard from '@/portal/components/feature-card/FeatureCard';
import { AllClassProps } from './allClass.type';
import SearchBar from '@/portal/components/search-bar';
import Pagination from '@/portal/components/pagination';
import DropdownCourse from '@/portal/components/dropdown-course/DropsownCourse';
import SkeletonLoader from '@/portal/components/skeleton-animation';
  const AllClassView: React.FC<AllClassProps> = ({ filterOptions, courses, isLoading, title }) => {
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
      <div className='flex flex-col'>
        <SkeletonLoader visible={isLoading ? isLoading : false} width={'25%'} height={35} containerStyle={{marginTop: 112}}/>
        {
          !isLoading &&
          <h2 className="font-poppins font-semibold text-slate-800 md:text-start text-center text-xl md:text-2xl lg:mt-28 lg:text-3xl">
            {title}
          </h2>
        }
      
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2 md:mt-20">
          <div className="md:w-1/4">
            <SkeletonLoader visible={isLoading ? isLoading : false} width={280} height={520} borderRadius={8} />
            {
              !isLoading &&
              <FilterView filterCategories={filterOptions} />
            }
          </div>
          <div className="md:w-3/4">
            <div className="flex items-center justify-between mb-6 space-x-4">
            <SkeletonLoader visible={isLoading ? isLoading : false} height={55} width={'30%'} />
            {
              !isLoading &&
              <>
              <SearchBar
                placeHolder="Jelajahi Kursus"
                className="w-full md:max-w-60 lg:max-w-80 border-none"
              />
              </>
            }  
            
              <div className="flex items-center space-x-4 md:space-x-6" style={isLoading === true ? {minWidth: 300} : undefined}>
                <SkeletonLoader visible={isLoading ? isLoading : false}  width={'25%'} />
                <SkeletonLoader visible={isLoading ? isLoading : false}  width={'50%'} height={40}/>
                {
                  !isLoading &&
                  <>
                  <p className="hidden md:block text-gray-700 font-medium text-sm md:text-base">
                    Sort By
                  </p>
                  <DropdownCourse />
                  </>
                }
            
            
              </div>
            </div>
            <div className="grid gap-4">
              {currentCourses.map((course, index) => (
              <FeatureCard key={index} {...course} isLoading={isLoading ? isLoading : false} originPrice={course.originalPrice.toString()} currentPrice={course.currentPrice.toString()} rating={course.rating.toString()}/>
              ))}
            </div>
            <SkeletonLoader visible={isLoading ? isLoading : false} width={'10%'}/>
            {
              !isLoading &&
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalResults={courses.length}
                itemsPerPage={itemsPerPage}
              />
            }
          
          </div>
        </div>
      </div>
    
    );
  };
export default AllClassView;