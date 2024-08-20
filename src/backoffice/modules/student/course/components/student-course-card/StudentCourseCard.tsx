import React, { useEffect, useRef } from 'react';
import { Badge, Button, Progress } from 'flowbite-react';

interface StudentCourseCardProps {
  title: string;
  status: 'On Going' | 'Complete';
  startDate: string;
  endDate: string;
  progress: number;
  image: string;
}

const StudentCourseCard: React.FC<StudentCourseCardProps> = ({
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
            <Badge
              color={status === 'On Going' ? 'warning' : 'success'}
              className="ml-2"
            >
              {status}
            </Badge>
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
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <Button color="warning" pill className="text-black">
            See Details
          </Button>
        </div>
      </div>
    );
  };

export default StudentCourseCard;
