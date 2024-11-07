'use client';
import React from 'react';
import HomeView from './Home.view';
import RenderNode from '../util/RenderNode';
import { useFetch } from '../hooks/useFetch';

const Home = () => {
  const url = process.env.NEXT_PUBLIC_API_SKRIPSI_URL;
  const { data, loading, error } = useFetch(`${url}/cms/home/all` || '');
  return (
    <RenderNode data={data} isLoading={loading} isError={error}>
      {data && <HomeView dataHome={data} skeletonAnimation={loading} />}
    </RenderNode>
  );
};

export default Home;
