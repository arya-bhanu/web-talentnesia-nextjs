'use client'
import React from 'react';
import Hero from './components/hero';
import PopularCourses from './components/popular-courses';
import { DetailCourseViewProps } from './detailCourse.type';
import DetailCard from '@/portal/components/detailCourse-card';
import Tabs from './components/tabs/tabs';
import ShareIcon from '../../../../../public/icons/course-detail/share.svg';
import { FeatureCardProps as courses } from '@/portal/components/feature-card/featureCard.type';

const DetailCourseView: React.FC<DetailCourseViewProps> = ({ data, isLoading }) => {
  return (
    <div className="relative overflow-x-hidden">
      <Hero isLoading={isLoading} />
      <div className="relative">
        <div className="container mt-12  relative z-10">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <Tabs />
            </div>
            <div className="md:w-full md:pl-8">
              <div className="md:absolute md:right-[-36rem] md:top-[-17rem] z-20 md:w-[calc(60%+8rem)] lg:w-[calc(70%+12rem)]">
                <DetailCard {...(data?.items?.[0] || {})} isLoading={isLoading} />
              </div>
            </div>

          </div>
          <div className="relative md:mt-20 flex justify-center md:pr-20 md:mr-[-24rem]">
            <div className='flex items-center md:mt-[-4rem]'>
              <ShareIcon className="w-5 h-5 mr-2" />
              <button className="text-sm font-medium">
                Share Course
              </button>
            </div>
          </div>
        </div>
        <div className="relative container pt-2 mt-[-8rem]">
          <PopularCourses courses={data?.items} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default DetailCourseView;
