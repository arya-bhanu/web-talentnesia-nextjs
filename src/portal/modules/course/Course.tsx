
import React from 'react';
import CourseView from './Course.view';
import { getHomeData } from '../home/hooks/getHomeData';

export const Course = async () => {
  try {
    const data = await getHomeData();
    return <CourseView data={data} />
  } catch (error) {
    return <div>Error loading data</div>
  }
};

