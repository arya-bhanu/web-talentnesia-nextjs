import React, { useState, useEffect, useRef } from 'react';
import FilterView from '@/portal/components/filter/Filter.view';
import FeatureCard from '@/portal/components/feature-card/FeatureCard';
import { AllClassProps } from './allClass.type';
import SearchBar from '@/portal/components/search-bar';
import Pagination from '@/portal/components/pagination';
import SkeletonLoader from '@/portal/components/skeleton-animation';
import Image from 'next/image';
import DropdownCourse from '../dropdown-course/DropdownCourse';

const AllClassView: React.FC<AllClassProps> = ({
  filterOptions,
  courses,
  isLoading,
  title,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const indexOfLastCourse = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsOverlayVisible(!isOverlayVisible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setIsSidebarOpen(false);
      setIsOverlayVisible(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex flex-col">
      <SkeletonLoader
        visible={!!isLoading}
        width={'25%'}
        height={35}
        containerStyle={{ marginTop: 112 }}
      />
      {!isLoading && (
        <h2 className="font-poppins font-semibold text-slate-800 text-center text-xl sm:text-2xl md:text-start mt-8 md:mt-8 lg:mt-28 lg:text-3xl">
          {title}
        </h2>
      )}

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 mt-8 md:space-x-16 lg:space-x-16 md:mt-12 lg:mt-16">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed md:static inset-y-0 left-0 w-64 bg-white shadow-lg z-20 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out md:translate-x-0 md:w-1/4 lg:w-1/5`}
        >
          <SkeletonLoader
            visible={!!isLoading}
            width="100%"
            height={520}
            borderRadius={8}
          />
          {!isLoading && <FilterView filterCategories={filterOptions} />}
        </div>

        {/* Overlay */}
        {isOverlayVisible && (
          <div className="fixed inset-0 bg-black opacity-30 z-10"></div>
        )}

        <div className="md:w-3/4 lg:w-4/5 md:pl-8 lg:pl-12">
          <div className="flex items-center justify-between mb-6 space-x-4">
            <SkeletonLoader visible={!!isLoading} height={55} width={'30%'} />
            {!isLoading && (
              <SearchBar
                placeHolder="Jelajahi Kursus"
                className="w-40 md:max-w-60 lg:max-w-80 border-none"
              />
            )}

            <div
              className="flex items-center space-x-4 md:space-x-6"
              style={isLoading ? { minWidth: 300 } : undefined}
            >
              <SkeletonLoader visible={!!isLoading} width={'25%'} />
              <SkeletonLoader visible={!!isLoading} width={'50%'} height={40} />
              {!isLoading && (
                <>
                  <p className="hidden sm:block text-gray-700 font-medium text-sm sm:text-base md:text-base">
                    Sort By
                  </p>
                  <div className="flex items-center space-x-2">
                    <DropdownCourse />
                    <button
                      className={`md:hidden rounded-lg transition-all duration-300 ${
                        isSidebarOpen
                          ? 'bg-gray-100 outline outline-1 outline-gray-300'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={toggleSidebar}
                    >
                      <Image
                        src="/icons/filter-card.svg"
                        alt="Filter"
                        width={48}
                        height={48}
                        className="w-12 h-12"
                      />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Course Cards */}
          <div className="grid gap-4">
            {currentCourses.map((course, index) => (
              <FeatureCard
                key={index}
                {...course}
                isLoading={!!isLoading}
                originalPrice={Number(course.originalPrice)}
                currentPrice={Number(course.currentPrice)}
                rating={Number(course.rating)}
              />
            ))}
          </div>

          {/* Pagination */}
          <SkeletonLoader visible={!!isLoading} width={'10%'} />
          {!isLoading && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalResults={courses.length}
              itemsPerPage={itemsPerPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllClassView;
