'use client';
import React from 'react';
import HomeView from './Home.view';
import { useQuery } from '@tanstack/react-query';
import { getHomeData } from './api/home.api';
import RenderNode from '../util/RenderNode';

const Home = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['home'],
    queryFn: getHomeData,
  });
  return (
    <RenderNode data={data} isLoading={isLoading} isError={isError}>
      {data && <HomeView dataHome={data?.data?.data} skeletonAnimation={isLoading} />}
    </RenderNode>
  );
};

export default Home;
