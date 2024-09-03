
import React from 'react';
import CourseView from './Course.view';
import homeApi from '../home/api/homeApi';

export const Course = async () => {
  try {
    const data = await homeApi();
    return <CourseView data={data} />
  } catch (error) {
    return <div>Error loading data</div>
  }
};

