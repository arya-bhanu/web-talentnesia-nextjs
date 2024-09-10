'use client';
import React from 'react';
import IicpView from './Iicp.view';
import iicpApi from './api/iicpApi';

export const Iicp = () => {
  const [data, setData] = React.useState<any>();
  const [skeletonAnimation, setSkeleton] = React.useState(true);

  React.useEffect(() => {
    iicpApi()
    .then((data) => {setData(data), 
      setTimeout(() => {
        setSkeleton(false);
    }, 500);
    })
    .catch((error) => {
      setTimeout(() => {
        setSkeleton(false);
    }, 500);
    })
  }, []);
  try {
    return <IicpView data={data} isLoading={skeletonAnimation} />;
  } catch (error) {
    return <div>Error loading data...</div>
  }
};
