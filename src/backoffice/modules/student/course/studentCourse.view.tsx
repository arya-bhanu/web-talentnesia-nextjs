"use client";

import React, { useState } from 'react';
import { TextInput, Dropdown, Button } from 'flowbite-react';
import { FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import StudentCourseCard from './components/student-course-card/StudentCourseCard';
import { courseData } from './studentCourse.data';
import { TabFlex } from '@/backoffice/components/tabs/tabs';

const StudentCourseView: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState('All');
  const [statusFilter, setStatusFilter] = useState('Select');
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const itemsPerPage = 3;

  const filteredCourses = courseData.filter(
    (course) =>
      course.title.toLowerCase().includes(filter.toLowerCase()) &&
      (status === 'All' || course.status === status)
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
          <div className="flex justify-between mb-4">
            <div className="relative">
              <TextInput
                id="search"
                type="text"
                placeholder="Search courses..."
                required
                icon={FaSearch}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <Dropdown className='fill-slate-700'
                label={
                    <div className="flex items-center">
                    {statusFilter}
                    <Image
                        src="/icons/sidebar/arrow-up.svg"
                        alt="Toggle arrow"
                        width={8}
                        height={8}
                        className="ml-2 transition-transform"
                        style={{
                        transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                        }}
                    />
                    </div>
                }
                dismissOnClick={false}
                onToggle={() => setIsOpen(!isOpen)}
                >
            <Dropdown.Item onClick={() => { setStatus('All'); setStatusFilter('Select'); }}>All</Dropdown.Item>
            <Dropdown.Item
                onClick={() => { setStatus('On Going'); setStatusFilter('On Going'); }}
                className="hover:bg-orange-100"
            >
                On Going
            </Dropdown.Item>
            <Dropdown.Item
                onClick={() => { setStatus('Complete'); setStatusFilter('Complete'); }}
                className="hover:bg-green-100"
            >
                Complete
            </Dropdown.Item>
            </Dropdown>
          </div>
          <div className="space-y-4">
            {currentCourses.map((course, index) => (
              <StudentCourseCard key={index} {...course} />
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredCourses.length)} of{' '}
              {filteredCourses.length} entries
            </div>
            <div className="flex space-x-2">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </>
      ),
      active: true
    },
    {
      title: "Wishlist Course",
      content: (
        <>
          {/* Implement Wishlist Course content here */}
        </>
      )
    }
  ];

  return (
    <div className="p-4">
      <TabFlex tabs={tabs} />
    </div>
  );
};

export default StudentCourseView;
