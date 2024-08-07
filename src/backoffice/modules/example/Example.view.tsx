import React from 'react';
import ExampleViewProps from './components/example.type';

const ExampleView: React.FC<ExampleViewProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default ExampleView;
