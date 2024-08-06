import React from 'react';

interface ExampleViewProps {
  children: React.ReactNode;
}

const ExampleView: React.FC<ExampleViewProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default ExampleView;
