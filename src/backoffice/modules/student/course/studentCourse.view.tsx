"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import StudentCourseCard from './components/student-course-card/StudentCourseCard';
import { TabFlex } from '@/backoffice/components/tabs/tabs';
import Search from '@/../public/icons/iconamoon_search-bold.svg';
import IconLeft from '@/../public/icons/btn-left.svg';
import IconRight from '@/../public/icons/btn-right.svg';
import { StudentCourseAPI } from './api/studentCourseApi';
import { APIResponseCourseItem } from './studentCourse.type';
import { fileHelper } from '@/helpers/file-manager/fileUpload.helper';

const StudentCourseView: React.FC = () => {
  const [courses, setCourses] = useState<(APIResponseCourseItem & { imageUrl: string })[]>([]);
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState('All');
  const [statusFilter, setStatusFilter] = useState('Select');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await StudentCourseAPI.fetch();
        const coursesWithImages = await Promise.all(response.data.items.map(async (course) => {
          let imageUrl = '/img/course/course-image-example-1.png'; // Default fallback image
          try {
            const imageBlob = await fileHelper.getFile(course.image);
            if (imageBlob) {
              imageUrl = URL.createObjectURL(imageBlob);
            }
          } catch (error) {
            console.error('Error loading image:', error);
          }
          return { ...course, imageUrl };
        }));
        setCourses(coursesWithImages);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [status, statusFilter]);

  const toggleStatusMenu = () => {
    setIsStatusMenuOpen(!isStatusMenuOpen);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(filter.toLowerCase()) &&
      (status === 'All' || (status === 'On Going' ? course.status === 123 : course.status !== 123))
  );

  const pageCount = Math.ceil(filteredCourses.length / itemsPerPage);
  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const tabs = [
    {
      title: "My Course",
      content: (
        <>
          <div className="flex justify-between mb-4 mt-7">
            <div className="flex items-center max-w-xs w-full">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <Search />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search ..."
                  required
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
            </div>
            <div className="relative">
              <button
                onClick={toggleStatusMenu}
                className="flex items-center focus:outline-none"
              >
                <div className="relative flex items-center space-x-2 bg-[#FFFFFF] p-2 rounded-lg shadow-sm">
                  <span className="text-gray-800 text-sm font-medium truncate">
                    {statusFilter}
                  </span>
                  <Image
                    src="/icons/sidebar/arrow-up.svg"
                    alt="Dropdown Arrow"
                    width={16}
                    height={16}
                    className={`transition-transform ${isStatusMenuOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>
              {isStatusMenuOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white shadow-md rounded-md p-2 z-50">
                  <ul className="space-y-2">
                    <li 
                      className="flex items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 cursor-pointer rounded-md p-2 text-sm"
                      onClick={() => { setStatus('All'); setStatusFilter('Select'); setCurrentPage(1); toggleStatusMenu(); }}
                    >
                      All
                    </li>
                    <li 
                      className="flex items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 cursor-pointer rounded-md p-2 text-sm"
                      onClick={() => { setStatus('On Going'); setStatusFilter('On Going'); setCurrentPage(1); toggleStatusMenu(); }}
                    >
                      On Going
                    </li>
                    <li 
                      className="flex items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 cursor-pointer rounded-md p-2 text-sm"
                      onClick={() => { setStatus('Complete'); setStatusFilter('Complete'); setCurrentPage(1); toggleStatusMenu(); }}
                    >
                      Complete
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-4 mt-11">
            {currentCourses.map((course) => (
              <StudentCourseCard
                key={course.id}
                id={course.id}
                title={course.name}
                status={course.status === 123 ? 'On Going' : 'Complete'}
                startDate={course.startDate}
                endDate={course.endDate}
                progress={course.progress}
                image={course.imageUrl}
              />
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2 text-[#667085]">
              <label htmlFor="pagination" className="block">
                Showing
              </label>
              <select
                id="pagination"
                value={itemsPerPage}
                onChange={(e) => {
                  setCurrentPage(1);
                  setItemsPerPage(Number(e.target.value));
                }}
                className="bg-[#FFFFFF] border max-w-[5rem] border-gray-300 text-[#667085] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              >
                {[3, 10, 20, 30, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <p className="w-full min-w-max">
                data out of {filteredCourses.length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <IconLeft />
              </button>
              <span className="text-sm text-[#667085]">
                Page {currentPage} of {pageCount}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
                disabled={currentPage === pageCount}
              >
                <IconRight />
              </button>
            </div>
          </div>
        </>
      ),
      active: true
    }
  ];

  return (
    <div className="p-4">
      <TabFlex tabs={tabs} />
    </div>
  );
};

export default StudentCourseView;
