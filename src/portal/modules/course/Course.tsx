'use client'
import React from 'react';
import CourseView from './Course.view';
import homeApi from '../home/api/homeApi';
import courseApi from './api/course';

export const Course = () => {
  const [data, setData] = React.useState<any>();
  const [skeletonAnimation, setSkeleton] = React.useState(true);

  React.useEffect(() => {
    courseApi()
    .then((data) => {setData(data),
      setTimeout(() => {
        setSkeleton(false);
    }, 500);
    })
    .catch((err) => {
      setTimeout(() => {
        setSkeleton(false);
    }, 500);
    });
  }, []);

  try {
    return <CourseView data={data || []} isLoading={skeletonAnimation}/>
  } catch (error) {
    return <div>Error loading data</div>
  }
};

