// Home.tsx
'use client';

import React, { useEffect, useState } from 'react';
import HomeView from './Home.view';
// import { getHomeData } from './hooks/getHomeData';
import { HomeProps, HomeData } from './home.type';
import homeApi from './api/homeApi';

export const Home = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    homeApi()
      .then((data) => setData(data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  try {
    return <HomeView data={data} />;
  } catch (error) {
    return <div>Error loading data</div>;
  }
};
