'use client';
import React from 'react';
import IicpView from './Iicp.view';
import iicpApi from './api/iicpApi';

export const Iicp = () => {
  const [data, setData] = React.useState<any>();

  React.useEffect(() => {
    iicpApi()
    .then((data) => setData(data))
    .catch((error) => {
      console.error(error);
      
    })
  }, []);
  try {
    return <IicpView data={data}/>;
  } catch (error) {
    return <div>Error loading data...</div>
  }
};
