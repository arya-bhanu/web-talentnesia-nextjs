'use client';
import React from 'react';
import Image from 'next/image';
import {
  ColumnChart,
  ColumnChart2,
} from './components/column-chart/ColumnChart';
import AreaChart from './components/area-chart/AreaChart';
import { DashboardData } from './dashboardAdmin.type';
import Custom500 from '@/components/500/500';
import Loading from '@/components/loading';
import PermissionGranted from '@/backoffice/components/permission-granted/PermissionGranted';

interface ImageData {
  [key: string]: {
    image: string;
  };
}
interface DashboardAdminViewProps {
  data: DashboardData;
  loading: boolean;
  error: Error | null;
  imageData: ImageData;
}

const DashboardAdminView: React.FC<DashboardAdminViewProps> = ({
  data,
  loading,
  error,
  imageData,
}) => {
  if (loading) return <Loading isLoading={loading} />;
  if (error) return <Custom500 />;

  return (
    <PermissionGranted roleable role='dashboard.read'>
      <div className="grid grid-cols-3 gap-5 mb-6 h-32">
        <PermissionGranted roleable role="dashboard.readTotalInstructor">
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
                  {data.totalIntruction}
                </div>
                <div className="text-md leading-5 font-medium text-gray-900 pl-2 pt-2">
                  Instructor
                </div>
              </div>
            </div>
          </div>
        </PermissionGranted>

        <PermissionGranted roleable role="dashboard.readTotalActiveStudent">
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
                  {data.totalStudent}
                </div>
                <div className="text-md leading-5 font-medium text-gray-900 pl-2 pt-2">
                  Active Students
                </div>
              </div>
            </div>
          </div>
        </PermissionGranted>

        <PermissionGranted roleable role="dashboard.readTotalCourse">
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
                  {data.totalCourse}
                </div>
                <div className="text-md leading-5 font-medium text-gray-900 pl-2 pt-2">
                  Course
                </div>
              </div>
            </div>
          </div>
        </PermissionGranted>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 w-full">
          <AreaChart data={data.growStudent} />
        </div>
        <div className="grid grid-cols-1 gap-5 w-full h-full ml-auto">
          <PermissionGranted roleable role="dashboard.readTotalElearning">
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
                        {data.totalElearning}
                      </div>
                    </div>
                    <div className="flex flex-col place-items-center pl-2 mr-auto">
                      <h3 className="text-[#B8B8D6] text-sm">E-Learning</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PermissionGranted>
          <PermissionGranted roleable role="dashboard.readTotalBootcamp">
            <div className="bg-white overflow-hidden shadow sm:rounded-lg flex items-center p-4 w-full">
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
                        {data.totalBootcamp}
                      </div>
                    </div>
                    <div className="flex flex-col place-items-center pl-2 mr-auto">
                      <h3 className="text-[#B8B8D6] text-sm">Bootcamp</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PermissionGranted>
          <PermissionGranted roleable role="dashboard.readTotalIicp">
            <div className="bg-white overflow-hidden shadow sm:rounded-lg flex items-center p-4 ">
              <div className="flex items-center">
                <div className="flex items-center justify-center bg-[#E8F8F5] rounded-lg w-14 h-14 mr-4 font-semibold">
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
                        {data.totalIicp}
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <h3 className="text-[#B8B8D6] text-sm">IICP</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PermissionGranted>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 justify-start">
        <PermissionGranted roleable role="dashboard.readBestSellerBootcamp">
          <div className="p-4 bg-white shadow-md rounded-lg w-full">
          <ColumnChart data={data.bestSellerBootcamp} title="Best Seller Bootcamp" />
          </div>
        </PermissionGranted>
        <PermissionGranted roleable role="dashboard.readLowestSellerBootcamp">
          <div className="p-4 bg-white shadow-md rounded-lg w-full">
          <ColumnChart2 data={data.lowSellerBootcamp} title="Lowest Seller Bootcamp" />
          </div>
        </PermissionGranted>
      </div>
    </PermissionGranted>
  );
};

export default DashboardAdminView;
