'use client';
import React from 'react';
import Image from 'next/image';
import {
  ColumnChart,
  ColumnChart2,
} from './components/column-chart/ColumnChart';
import AreaChart from './components/area-chart/AreaChart';
import { DashboardData } from './dashboardAdmin.type';
import { imageData } from './dashboardAdmin.data';
import Custom500 from '@/components/500/500';
import Loading from '@/components/loading';

interface DashboardAdminViewProps {
  data: DashboardData;
  loading: boolean;
  error: Error | null;
}

const DashboardAdminView: React.FC<DashboardAdminViewProps> = ({
  data,
  loading,
  error,
}) => {
  if (loading) return <Loading isLoading={loading} />;
  if (error) return <Custom500 />;

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-5 mb-6 h-32">
        <div className="bg-[#FFE2E6] overflow-hidden shadow sm:rounded-lg flex p-6 relative">
          <div className="absolute top-4 left-4 flex items-center justify-center bg-[#F04438] rounded-full w-12 h-12 ml-2.5">
            <Image
              src={imageData.instructorData.image}
              alt="Instructor Image"
              width={28}
              height={28}
              className="rounded-lg"
            />
          </div>
          <div className="pl-3 mt-10  flex flex-col items-start">
            <div className="flex items-start pt-2">
              <div className="text-xl leading-9 font-bold text-gray-900">
                {imageData.instructorData.data}
              </div>
              <div className="text-md leading-5 font-medium text-gray-900 pl-2 pt-2">
                Instructor
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#FFF4DC] overflow-hidden shadow sm:rounded-lg flex p-6 relative">
          <div className="absolute top-4 left-4 flex items-center justify-center bg-[#F79009] rounded-full w-12 h-12 ml-2.5">
            <Image
              src={imageData.studentData.image}
              alt="Student Image"
              width={28}
              height={28}
              className="rounded-lg"
            />
          </div>
          <div className="mt-10 pl-3 flex flex-col">
            <div className="flex items-start pt-2">
              <div className="text-xl leading-9 font-bold text-gray-900">
                {imageData.studentData.data}
              </div>
              <div className="text-md leading-5 font-medium text-gray-900 pl-2 pt-2">
                Active Students
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#D8F1D9] overflow-hidden shadow sm:rounded-lg flex p-6 relative">
          <div className="absolute top-4 left-4 flex items-center justify-center bg-[#15B79E] rounded-full w-12 h-12 ml-2.5">
            <Image
              src={imageData.courseData.image}
              alt="Course Image"
              width={28}
              height={28}
              className="rounded-lg"
            />
          </div>
          <div className=" pl-3 mt-10 flex flex-col">
            <div className="flex items-start pt-2">
              <div className="text-xl leading-9 font-bold text-gray-900">
                {imageData.courseData.data}
              </div>
              <div className="text-md leading-5 font-medium text-gray-900 pl-2 pt-2">
                Course
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-12 mb-6">
        <div className="col-span-2 w-[115%]">
          <AreaChart />
        </div>
        <div className="grid grid-cols-1 gap-5 w-[280px] h-full ml-auto">
          <div className="bg-white overflow-hidden shadow sm:rounded-lg flex items-center p-4">
            <div className="flex items-center justify-end">
              <div className="flex items-center justify-center bg-[#F2EFFE] rounded-lg w-14 h-14 mr-4 font-semibold">
                <Image
                  src={imageData.eLearningData.image}
                  alt="E-Learning Image"
                  width={28}
                  height={28}
                  className="rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <div className="text-md leading-5 font-medium text-gray-900 font-poppins">
                  Total E-Learning
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center">
                    <div className="text-xl leading-9 font-semibold text-[#957BF9]">
                      {imageData.eLearningData.data}
                    </div>
                  </div>
                  <div className="flex flex-col place-items-center pl-2 mr-auto">
                    <h3 className="text-[#B8B8D6] text-sm">E-Learning</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow sm:rounded-lg flex items-center p-4">
            <div className="flex items-center">
              <div className="flex items-center justify-center bg-[#EAF4FF] rounded-lg w-14 h-14 mr-4 font-semibold">
                <Image
                  src={imageData.bootcampData.image}
                  alt="Bootcamp Image"
                  width={28}
                  height={28}
                  className="rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <div className="text-md leading-5 font-medium text-gray-900 font-poppins">
                  Total Bootcamp
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-start">
                    <div className="text-xl leading-9 font-semibold text-[#58A6FB]">
                      {imageData.bootcampData.data}
                    </div>
                  </div>
                  <div className="flex flex-col place-items-center pl-2 mr-auto">
                    <h3 className="text-[#B8B8D6] text-sm">Bootcamp</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow sm:rounded-lg flex items-center p-4">
            <div className="flex items-center">
              <div className="flex items-center justify-center bg-[#E8F8F5] rounded-lg w-12 h-14 mr-4 font-semibold">
                <Image
                  src={imageData.iicpData.image}
                  alt="IICP Image"
                  width={28}
                  height={28}
                  className="rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <div className="text-md leading-5 font-medium text-gray-900 font-poppins">
                  Total IICP
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-start">
                    <div className="text-xl leading-9 font-semibold text-[#44C5B1]">
                      {imageData.iicpData.data}
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <h3 className="text-[#B8B8D6] text-sm">IICP</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 justify-start">
        <div className="p-4 bg-white shadow-md rounded-lg w-full">
          <ColumnChart />
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg w-full">
          <ColumnChart2 />
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminView;
