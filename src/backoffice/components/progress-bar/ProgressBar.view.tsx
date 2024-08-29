import React from 'react';

const ProgressBarView = ({ progress }: { progress: number }) => {
  return (
    <div className="relative h-3 w-full flex-1 min-w-28 bg-[rgba(94,171,190,0.07)] rounded-full">
      <div
        style={{ width: `${progress}%` }}
        className={`absolute rounded-full h-3 bg-[#219EBC]`}
      ></div>
    </div>
  );
};

export default ProgressBarView;
