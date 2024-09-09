'use client'
import React from 'react';
import CourseView from './Course.view';
import homeApi from '../home/api/homeApi';
import courseApi from './api/course';

export const Course = () => {
  const [data, setData] = React.useState<any>();

  React.useEffect(() => {
    courseApi()
    .then((data) => setData(data))
    .catch((err) => {
      console.error(err);
    });
  }, []);

  try {
    return <CourseView data={data} />
  } catch (error) {
    return <div>Error loading data</div>
  }
};

