import React from 'react';
import ProgressBarView from './ProgressBar.view';

const ProgressBar = ({ progress }: { progress: number }) => {
  return <ProgressBarView progress={progress} />;
};

export default ProgressBar;
