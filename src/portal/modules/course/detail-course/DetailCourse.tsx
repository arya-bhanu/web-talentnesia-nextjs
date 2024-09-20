'use client'
import React from 'react';
import DetailCourseView from './DetailCourse.view';
import detailCourseApi from './api/detail-course';

export const DetailCourse = () => {
  const [data, setData] = React.useState<any>();
  const [skeletonAnimation, setSkeleton] = React.useState(true);

  React.useEffect(() => {
    detailCourseApi()
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
    return <DetailCourseView data={data || []} isLoading={skeletonAnimation}/>
  } catch (error) {
    return <div>Error loading data</div>
  }
};

