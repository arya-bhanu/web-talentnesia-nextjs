// Home.tsx
import React from 'react';
import HomeView from './Home.view';
import { getHomeData } from './hooks/getHomeData';
import { HomeProps, HomeData } from './home.type';

export const Home = async () => {
  try {
    const data = await getHomeData();
    console.log(data);
    return <HomeView data={data} />;
  } catch (error) {
    return <div>Error loading data</div>;
  }
};
