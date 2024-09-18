import React from 'react';
import PopularCoursesSectionView from './PopularCourse.view';
import { courses } from '@/portal/components/feature-card/featureCard.type';

export const PopularCourses = ({ className, courses, isLoading }: { className?: string, courses: courses[], isLoading?: boolean }) => {
  return <PopularCoursesSectionView className={className} courses={courses || []} isLoading={isLoading} />;
};
