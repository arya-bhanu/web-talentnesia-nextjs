'use client';

import React from 'react';
import CourseDetailView from './CourseDetail.view';
import { useSearchParams } from 'next/navigation';

const CourseDetail: React.FC = () => {
    const searchParams = useSearchParams();
    const courseId = searchParams.get('courseId');

    if (!courseId) {
        return <div>Course ID not found</div>;
    }

    return (
        <div>
            <CourseDetailView courseId={courseId} />
        </div>
    );
};

export default CourseDetail;
