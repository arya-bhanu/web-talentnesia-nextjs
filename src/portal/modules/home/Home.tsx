// Home.tsx
'use client';

import React, { useEffect, useState } from 'react';
import HomeView from './Home.view';
// import { getHomeData } from './hooks/getHomeData';
import { HomeProps, HomeData } from './home.type';
import homeApi from './api/homeApi';

export const Home = () => {
  const [data, setData] = useState<any>();
  const [skeletonAnimation, setSkeleton] = useState(true);

  useEffect(() => {
    homeApi()
      .then((data) => {setData(data), 
        setTimeout(() => {
          setSkeleton(false);
      }, 500)})
      .catch((err) => {
        console.error(err);
      });
  }, []);

  try {
    return <HomeView data={data} isLoading={skeletonAnimation}/>;
  } catch (error) {
    return <div>Error loading data</div>;
  }
};
