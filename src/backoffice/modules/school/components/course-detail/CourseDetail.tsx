import React, { useEffect, useState } from 'react';
import CourseDetailView from './CourseDetail.view';
import { CourseDetailProps, CourseData } from './courseDetail.type';
import { ListTableStudentAPI } from './api/courseDetailApi';

const CourseDetail: React.FC<CourseDetailProps> = (props) => {
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const data = await ListTableStudentAPI.fetch(props.courseId);
        setCourseData(data.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [props.courseId]);

  return <CourseDetailView {...props} courseData={courseData} loading={loading} />;
};

export default CourseDetail;
