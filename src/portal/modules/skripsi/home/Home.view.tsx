import React from 'react';
import { IHomeProps } from './home.type';

const HomeView: React.FC<IHomeProps> = ({ dataHome }) => {
  console.log(dataHome);
  return <div>HomeView</div>;
};

export default HomeView;
