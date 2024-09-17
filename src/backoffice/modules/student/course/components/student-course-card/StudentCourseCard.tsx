import React, { useEffect, useRef } from 'react';
import { Badge, Button, Progress } from 'flowbite-react';
import Link from 'next/link';

interface StudentCourseCardProps {
  id: string;
  title: string;
  status: 'On Going' | 'Complete';
  startDate: string;
  endDate: string;
  progress: number;
  image: string;
}

const StudentCourseCard: React.FC<StudentCourseCardProps> = ({
    id,
    title,
    status,
    startDate,
    endDate,
    progress,
    image,
  }) => {
    return (
      <div className="flex h-[100px] w-full">
        <div className="h-full aspect-square">
          <img src={image} alt={title} className="h-full w-full object-cover rounded" />
        </div>
        <div className="flex-grow flex flex-col justify-center ml-4">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold">{title}</h3>
            <div 
            className={`inline-block px-3 ml-3 py-1 text-xs font-semibold rounded-full ${
                status === 'On Going' 
                ? 'bg-yellow-100 text-[#F79009]' 
                : status === 'Complete'
                ? 'bg-green-100 text-[#10A760]'
                : 'bg-gray-100 text-gray-800'
            }`}
            style={{
                borderRadius: '9999px',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
            }}
            >
            {status}
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {new Date(startDate).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })} -{' '}
            {new Date(endDate).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <div className="flex items-center mt-[30px]">
            <span className="mr-2">{progress}%</span>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-[#219EBC] h-2.5 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
        <Link href={`/student/course/course-detail?courseId=${id}`}>
        <button
          className="flex items-center focus:outline-none text-white bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-transparent font-medium rounded-[20px] text-sm px-5 py-2.5 me-2 mb-2"
        >
          <span className="text-[#344054]">See Detail</span>
        </button>
      </Link>
        </div>
      </div>
    );
  };

export default StudentCourseCard;
