'use client';

import React from 'react';
import CourseDetailView from './CourseDetail.view';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { StudentCourseAPI } from '../course/api/studentCourseApi';
import { APIResponseCourseDetail } from './courseDetail.type';

const CourseDetail: React.FC = () => {
    const searchParams = useSearchParams();
    const courseId = searchParams.get('courseId');

    const { data: courseDetailData, isLoading } = useQuery<APIResponseCourseDetail>({
        queryKey: ['courseDetail', courseId],
        queryFn: () => StudentCourseAPI.fetchDetail(courseId!),
        enabled: !!courseId,
    });

    if (!courseId) {
        return <div>Course ID not found</div>;
    }

    return (
        <div>
            <CourseDetailView 
                courseId={courseId} 
                courseDetailData={courseDetailData || null}
                loading={isLoading}
            />
        </div>
    );
};

export default CourseDetail;
